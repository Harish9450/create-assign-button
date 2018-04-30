//
// Copyright (C) Microsoft Corporation.  All rights reserved.
//

import { isNullOrUndefined } from "util";
import { Config } from "./ComponentConfigs/ComponentConfig";
import { ComponentConfigs, ContextOf } from "./ComponentConfigs/ConfigHelpers";
import { EntityConfig, PositionConfig, ProductConfig, TaskConfig, ContactConfig, LeadConfig, InvoiceConfig, QuoteConfig } from "./ComponentConfigs/EntityComponentConfig";
import { AttributeOf, Component, ComponentDescription, ComponentType, ContractOf, DescriptionOf, IPagingInfo } from "./Contracts/ComponentContracts";
import { DataType } from "./Contracts/DataTypeContracts";
import { TransformationMap } from "./Contracts/Transformations";
import { HostingEnvironment } from "./HostingEnvironment";
import { WebRequestError } from "./WebRequestError";

export interface ICDSApiClient {
    describeAsync<T extends ComponentType>(componentType: T): Promise<DescriptionOf<T>>;
    fetchListAsync<T extends ComponentType>(
        componentType: T,
        context?: ContextOf<T>,
        columns?: Array<AttributeOf<T>>,
        paging?: IPagingInfo
    ): Promise<Array<ContractOf<T>>>;
    fetchAttributesAsync<T extends ComponentType>(
        componentType: T
    ): Promise<Object>;
}

export interface IBasicAuthentication {
    kind: "basic";
    userName: string;
    password: string;
}

export interface ITokenAuthentication {
    kind: "token";
    accessToken: string;
}

export class CdsApiClient implements ICDSApiClient {

	/*private GetContract<T extends ComponentType>(config: Config<T>): ContractOf<T> {
		const result: Partial<ContractOf<T>> = {};
		for (const key of Object.keys(config.component.Attributes)) {
			result[key] = config.component.Attributes[key];
		}
		return result as ContractOf<T>;
	}*/

    public async describeAsync<T extends ComponentType>(componentType: T): Promise<DescriptionOf<T>> {
        // tslint:disable-next-line:typedef
        const componentConfig = ComponentConfigs[componentType];

        return componentConfig.component;
    }

	/**
	 * Gets the root URL of all services hosted in the provided hosting environment.
	 * @param hostingEnvironment - Hosting environment hosting the services of which to get the root URL of.
	 */
    public static getBaseUrlFromHostingEnvironment(hostingEnvironment: HostingEnvironment): URL {
        let rootURL: URL = null;

        switch (hostingEnvironment) {
            case HostingEnvironment.TESTING:
                rootURL = new URL(`https://ti1plainorg53sg425.crm2.crmlivetie.com`);
                //rootURL = new URL(`http://onefarm2218i.onefarm2218idom.extest.microsoft.com`);
                break;
            default:
                throw new Error("hostingEnvironment");
        }

        return new URL("/api/data/", rootURL.toString());
    }

	/**
	 * Gets the default hosting environment to use, if none is specified.
	 */
    public static get defaultHostingEnvironment(): HostingEnvironment {
        return HostingEnvironment.PRODUCTION;
    }

	/**
	 * Gets the default version of this Web API to use, if none is specified.
	 */
    public static get defaultApiVersion(): string {
        return "9.0";
    }

	/**
	 * Gets the deafult page size to use when retrieving sets of resources.
	 */
    public static readonly defaultPageSize: number = 100;

	/**
	 * Gets the max page size allowed when retrieving sets of resources.
	 */
    public static readonly maxPageSize: number = 5000;

	/**
	 * Initializes a new instance of the CdsApiClient class.
	 * @param accessToken - Security token used to authenticate this client with the Web service.
	 * @param apiVersion - Version of the API with which to communicate with.
	 * @param hostingEnvironment - Hosting environment in which the API is hosted.
	 */
    public constructor(
        protected readonly authentication: IBasicAuthentication | ITokenAuthentication,
        public readonly apiVersion?: string,
        public readonly hostingEnvironment?: HostingEnvironment
    ) {
        if (authentication === null) {
            throw new Error("authentication");
        }

        if (apiVersion == null) {
            this.apiVersion = CdsApiClient.defaultApiVersion;
        }

        if (hostingEnvironment == null) {
            this.hostingEnvironment = CdsApiClient.defaultHostingEnvironment;
        }
    }

	/**
	 * Asynchronously fetches a page of entities from the OData Web service.
	 * @param columns - Value of the OData $select parameter specifying which fields to retrieve.
	 * @param expand - Value of the OData $expand parameter specifying which related entities to retrieve and which fields of those entities.
	 * @param filter - Value of the OData $filter parameter used to determine which entities to include in the results.
	 * @param orderBy - Value of the OData $orderby parameter used to sort the results.
	 * @param params - Additional query string parameters.
	 * @param mapping - Mapping function applied to each record in the response.
	 */
    public async fetchListAsync<T extends ComponentType>(
        componentType: T,
        context?: ContextOf<T>,
        columns?: Array<AttributeOf<T>>,
        // expand?: string,
        // filter?: string,
        // viewFilter?: string,
        // orderBy?: string,
        // params?: Map<string, string>,
        paging?: IPagingInfo
    ): Promise<Array<ContractOf<T>>> {

        // tslint:disable-next-line:typedef
        const componentConfig = ComponentConfigs[componentType];

        const parameters: Map<string, string> = new Map<string, string>();
        // tslint:disable-next-line:typedef
        const componentEndpoint = componentConfig.endpoints.List;

        if (!isNullOrUndefined(columns) && columns.length !== 0) {
            parameters.set("$select", columns.join(","));
        }

        if (componentEndpoint.filter != null && componentEndpoint.filter !== "") {
            parameters.set("$filter", componentEndpoint.filter);
        }

		/* if (expand != null && expand !== "") {
			parameters.set("$expand", expand);
		}

		if (filter != null && filter !== "") {
			parameters.set("$filter", filter);
		}

		if (orderBy != null && orderBy !== "") {
			parameters.set("$orderby", orderBy);
		}

		if (params != null && params.size > 0) {
			parameters = new Map([...parameters, ...params]);
		}
		*/

        const url: URL = new URL(`v${this.apiVersion}/${encodeURIComponent(componentEndpoint.endpoint)}` + CdsApiClient.mapToQueryString(parameters),
            `${CdsApiClient.getBaseUrlFromHostingEnvironment(this.hostingEnvironment)}`);

        let response: Response = null;

        const request: Request = new Request(url.toString(), {
            headers: this.defaultRequestHeaders,
            method: "get",
            mode: "cors"
        });

        try {
            response = await fetch(request);
        } catch (e) {
            throw e;
        }

        if (!response.ok) {
            throw new WebRequestError(response);
        }

        let responseContent: any = await response.json();

        if (responseContent && responseContent.value) {
            responseContent = responseContent.value;
        }

        const metadataList = responseContent as Array<ContractOf<T>>;

        // Transform response
        const attr = componentConfig.component.Attributes;

        metadataList.forEach(metadata => {
            columns.forEach(column => {
                const attrvalue = attr[column as keyof Component]; // search the attribute value in the config for the selected column
                // Check if the attrvalue has transformation set
                if (attrvalue.transformation) {
                    const transformedValue = TransformationMap[attrvalue.transformation](metadata[column as keyof Component]);
                    metadata[column as keyof Component] = transformedValue; // replace the value with the transformed value
                }
            });
        });

        return metadataList; // as Array<ContractOf<T>>;
    }
    public async fetchUserListAsync(
        endpoint: string,
        select?: string,
        filter?: string,
        orderBy?: string,
    ): Promise<Array<any>> {
        var params: string="";
        if (select != null && select != undefined) {
            params = params+ "$select=" + select;
        }
        if (filter != null && filter != undefined) {
            params = params+ "&$filter=" + filter;
        }
        if (orderBy != null && orderBy != undefined) {
            params = params+ "&$orderby=" + orderBy;
        }
        const url: URL = new URL(`v${this.apiVersion}/${endpoint}`,
            `${CdsApiClient.getBaseUrlFromHostingEnvironment(this.hostingEnvironment)}`);

        let response: Response = null;

        const request: Request = new Request(url.toString(), {
            headers: this.defaultRequestHeaders,
            method: "get",
            mode: "cors"
        });

        try {
            response = await fetch(request);
        } catch (e) {
            throw e;
        }

        if (!response.ok) {
            throw new WebRequestError(response);
        }

        let responseContent: any = await response.json();

        if (responseContent && responseContent.value) {
            responseContent = responseContent.value;
        }
        return responseContent; // as Array<ContractOf<T>>;
    }

    public async fetchAttributesAsync<T extends ComponentType>(
        componentType: T
    ): Promise<Object> {
        //https://sg483org010603.crm2.crmlivetie.com/api/data/v9.0/EntityDefinitions(LogicalName='account')/Attributes

        const componentConfig = ComponentConfigs[componentType];

        const url: URL = new URL(`v${this.apiVersion}/EntityDefinitions(LogicalName='${componentType.toLowerCase()}')/Attributes`,
            `${CdsApiClient.getBaseUrlFromHostingEnvironment(this.hostingEnvironment)}`);

        let response: Response = null;

        const request: Request = new Request(url.toString(), {
            headers: this.defaultRequestHeaders,
            method: "get",
            mode: "cors"
        });

        try {
            response = await fetch(request);
        } catch (e) {
            throw e;
        }

        if (!response.ok) {
            throw new WebRequestError(response);
        }

        let responseContent: any = await response.json();

        if (responseContent && responseContent.value) {
            responseContent = responseContent.value;
        }

        const metadataList = responseContent as Array<ContractOf<T>>;

        let attribsArr: string[] = Array();
        // let map = new Map();
        metadataList.forEach(metadata => {
            // attribsArr.push(`"${metadata.LogicalName}": { "label": "${metadata.SchemaName}", "type": "${metadata.AttributeType}"}`)
            //   map.set(metadata.LogicalName, `{ label: ${metadata.SchemaName}, type: ${metadata.AttributeType} }`);
        });

        let strAttributes: string;
        strAttributes = '{' + attribsArr.join(',') + '}';

        let attrObj: Object;
        attrObj = JSON.parse(strAttributes);
        console.log(attrObj);

        return attrObj;
    }

    public async SaveNewRecord<T extends ComponentType>(
        componentType: T,
        context?: ContextOf<T>,
        columns?: Array<AttributeOf<T>>,
        params?: string, // Map<string, string>,
        paging?: IPagingInfo
    ): Promise<boolean> {

        // tslint:disable-next-line:typedef
        const componentConfig = ComponentConfigs[componentType];

        const componentEndpoint = componentConfig.endpoints.List;
        const _body = params; // JSON.stringify(params);


        const url: URL = new URL(`v${this.apiVersion}/${encodeURIComponent(componentEndpoint.endpoint)}`,
            `${CdsApiClient.getBaseUrlFromHostingEnvironment(this.hostingEnvironment)}`);

        let response: Response = null;

        const request: Request = new Request(url.toString(), {
            headers: this.defaultRequestHeaders,
            method: "post",
            mode: "cors",
            body: _body
        });

        try {
            response = await fetch(request);
        } catch (e) {
            throw e;
        }

        if (!response.ok) {
            throw new WebRequestError(response);
        }

        return true; // as Array<ContractOf<T>>;
    }

    public async Assign(params?: string): Promise<boolean> {

        const _body = params; // JSON.stringify(params);


        const url: URL = new URL(`v${this.apiVersion}/Assign`,
            `${CdsApiClient.getBaseUrlFromHostingEnvironment(this.hostingEnvironment)}`);

        let response: Response = null;

        const request: Request = new Request(url.toString(), {
            headers: this.defaultRequestHeaders,
            method: "post",
            mode: "cors",
            body: _body
        });

        try {
            response = await fetch(request);
        } catch (e) {
            throw e;
        }

        if (!response.ok) {
            throw new WebRequestError(response);
        }

        return true; // as Array<ContractOf<T>>;
    }

    public async UpdateRecord<T extends ComponentType>(
        componentType: T,
        params: string,
        id: string
    ): Promise<boolean> {
        const componentConfig = ComponentConfigs[componentType];

        const componentEndpoint = componentConfig.endpoints.List;

        const _bodyParams = params;

        const url: URL = new URL(`v${this.apiVersion}/${encodeURIComponent(componentEndpoint.endpoint)}(${id})`,
            `${CdsApiClient.getBaseUrlFromHostingEnvironment(this.hostingEnvironment)}`);

        let response: Response = null;

        const request: Request = new Request(url.toString(), {
            headers: this.defaultRequestHeaders,
            method: "PATCH",
            mode: "cors",
            body: _bodyParams
        });
        request.headers.set("Content-Type", "application/json; charset=utf-8");
        try {
            response = await fetch(request);
        } catch (e) {
            throw e;
        }

        if (!response.ok) {
            return false;
            // throw new WebRequestError(response);
        }
        else {
            return true;
        }
    }

    /**
	 * Gets the collection of headers added to every request by default.
	 */
    protected get defaultRequestHeaders(): Headers {
        const headers: Headers = new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json"
        });

        const authorizationHeaderValue = this.getAuthorizationHeaderValue();

        if (authorizationHeaderValue) {
            headers.append("Authorization", authorizationHeaderValue);
        }

        return headers;
    }

    private getAuthorizationHeaderValue() {
        switch (this.authentication.kind) {
            case "basic": {
                const authValue = btoa(`${this.authentication.userName}:${this.authentication.password}`);
                return `Basic ${authValue}`;
            }
            case "token": {
                return `Bearer ${this.authentication.accessToken}`;
            }
        }
    }

	/**
	 * Builds a query string from a Map.
	 * @param map - The map with the query string parameters.
	 */
    public static mapToQueryString(map: Map<string, string>): string {
        if (map == null || map.size === 0) {
            return "";
        }

        let queryString: string = "";

        map.forEach((value: string, key: string) => {
            if (queryString === "") {
                queryString += "?";
            } else {
                queryString += "&";
            }

            queryString += encodeURIComponent(key) + "=" + encodeURIComponent(value);
        });

        return queryString;
    }

	/**
	 * Populates a Map with the parameters of a query string.
	 * @param queryString - The query string from which to populate the Map.
	 */
    public static queryStringToMap(queryString: string): Map<string, string> {
        if (queryString == null || queryString === "") {
            return new Map<string, string>();
        }

        const map: Map<string, string> = new Map<string, string>();

        if (queryString.indexOf("?") === 0) {
            queryString = queryString.substr(1);
        }

        const pairs: string[] = queryString.split("&");

        pairs.forEach(pair => {
            let key: string;
            let value: string;

            if (pair.indexOf("=") >= 0) {
                key = pair.substring(0, pair.indexOf("="));
                value = pair.substring(pair.indexOf("=") + 1, pair.length);
            } else {
                key = pair;
                value = null;
            }

            map.set(decodeURIComponent(key), decodeURIComponent(value));
        });

        return map;
    }

    private static getEmptyIfNull(anyString: string): string {
        return anyString || "";
    }
}
