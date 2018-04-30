import * as React from "react";
import { ICDSApiClient } from "../../../shared/services/temp/CdsApiClient";
import { AttributeOf, ComponentType, ContractOf, DescriptionOf } from "../../../shared/services/temp/Contracts/ComponentContracts";
import { IItem, IMetadataListProps, IMetadataListState } from "./../MetadataList.types";
import { auth } from "../../../shared/tokenConfig";

export class SchemaManager<T extends ComponentType> extends React.Component<IMetadataListProps<T>, IMetadataListState>{

    public static defaultProps: Partial<IMetadataListProps<ComponentType>> = {
        config: {},
        filter: {}
    };

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            loading: true,
            data: [], 
            config:null
            //config: this.mergeBaseAndUserConfig()
        };
    }
}