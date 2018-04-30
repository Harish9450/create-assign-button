
import { IListItem } from "@business-app/fabric";
import {
    IColumn, Selection
} from "office-ui-fabric-react/lib/DetailsList";
import { ICDSApiClient } from "../../shared/services/temp/CdsApiClient";
import { ContextOf } from "../../shared/services/temp/ComponentConfigs/ConfigHelpers";
import {
    AttributeOf,
    ComponentDescription,
    ComponentType, ContractOf, DescriptionOf
} from "../../shared/services/temp/Contracts/ComponentContracts";
import { IMetadataListConfig } from "./config/MetadataListConfig.types";

export interface IMetadataListProps<T extends ComponentType> {
    componentType: T;
    context?: ContextOf<T>;
    xrmApiClient: ICDSApiClient;
    config?: IMetadataListConfig;
    onSelectChange?: (rows: Array<ContractOf<T>>) => void;
    onStateChanged?: Function;
    filter?: IFilter;
    renderItemColumn?:() => any;
}

export interface IMetadataListState {
    columns: IColumn[];
    loading: boolean;
    data: IItem[];
    config: IMetadataListConfig;
}

export interface IItem extends IListItem {
    [columnName: string]: any;
    rawIndex?: number | string;
}

export interface IFilter {
    userFilter?: string;
    viewFilter?: string;
}
