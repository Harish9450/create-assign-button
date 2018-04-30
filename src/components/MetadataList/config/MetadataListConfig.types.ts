import { AttributeOf, ComponentType, ContractOf, DescriptionOf } from "../../../shared/services/temp/Contracts/ComponentContracts";
import { DataType, DataTypeContract } from "../../../shared/services/temp/Contracts/DataTypeContracts";

export type DataTypeOf<C extends ComponentType, A extends AttributeOf<C>> =
    (DescriptionOf<C>["Attributes"][A] & { [x: string]: never })["type"];

export type IMetadataListConfig = {
    [C in ComponentType]?: IComponentConfig<C>;
};

export interface IComponentConfig<T extends ComponentType> {
    /**
     * Each key specifies the column that needs to be rendered,
     * the value of which is the specific Column Configuration
     * @memberof IComponentConfig
     */
    columns?: {
        [A in AttributeOf<T>]?: IColumnConfig<T, DataTypeOf<T, A>>;
    };
    /**
     * Optional configuration settings for the list
     */
    options?: {
        selection?: {
            /**
             * Specifies how rows are selected in the list
             * Default: none
             *
             * @type {("none" | "single" | "multiple")}
             */
            selectionMode?: "none" | "single" | "multiple",
            showSelectionIcon?: boolean,
            /**
             * Enables marquee selection
             * Default: true
             *
             * @type {boolean}
             */
            enableMarqueeSelection?: boolean
        }
    };
}

export interface IColumnConfig<T extends ComponentType, A extends DataType> {
    /**
     * Specifies a function each value in the column is transformed with
     *
     * @memberof IColumnConfig
     */
    transform?: (value: DataTypeContract[A], rowData?: ContractOf<T>) => string | React.ReactElement<any> | React.Component<any>;
    columnWidth?: "small" | "medium" | "large";
}
