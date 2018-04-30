import { Attribute, Component, ComponentType, ContractOf, DescriptionOf } from "../Contracts/ComponentContracts";
import { DataType } from "../Contracts/DataTypeContracts";

export enum EndpointPurpose {
	List = "List",
	Fetch = "Fetch",
	Create = "Create",
	Delete = "Delete",
	Update = "Update"
}

export type EndpointConfig = { [K in keyof typeof EndpointPurpose]?: EndpointProps };
export type EndpointProps = {
	endpoint: string; // Endpoint uri for the current component purpose.
	filter?: string;
	// viewFilter?: Map<string, string>; // Map of supported view filter name (All, customizable, custom, etc.) and the filter to apply.
};

export type Config<T extends ComponentType> = {
	endpoints: EndpointConfig;
	component: DescriptionOf<T>;
};
