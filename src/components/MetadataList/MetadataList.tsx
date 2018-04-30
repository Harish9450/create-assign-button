import { DetailsList } from "@business-app/fabric";
import { MarqueeSelection } from "office-ui-fabric-react";
import { IColumn, Selection, SelectionMode, IDetailsRowProps } from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
// import { initializeIcons } from '@uifabric/icons';
import * as React from "react";
import { AttributeOf, ComponentType, ContractOf, DescriptionOf } from "../../shared/services/temp/Contracts/ComponentContracts";
import { DataType } from "../../shared/services/temp/Contracts/DataTypeContracts";
import { baseConfig } from "./config/BaseConfig";
import { IColumnConfig, IComponentConfig, IMetadataListConfig } from "./config/MetadataListConfig.types";
import { IItem, IMetadataListProps, IMetadataListState } from "./MetadataList.types";
import 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsListExample.scss';
import { BrowserRouter as Router, Link, Route, Redirect } from "react-router-dom";
import { store } from "../../shared/store";

export class MetadataList<T extends ComponentType> extends React.Component<IMetadataListProps<T>, IMetadataListState> {
    private config: IMetadataListConfig;
    private rawMetadata: Array<ContractOf<T>>;
    private componentDescription: DescriptionOf<T>;
    private selection: Selection;
    private static columnWidthMap = {
        small: 150,
        medium: 200,
        large: 250
    };

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
            config: this.mergeBaseAndUserConfig()
        };
        this.selection = new Selection({
            onSelectionChanged: this.onSelectionChanged.bind(this)
        });
        this.rawMetadata = [];

        // initializeIcons();
    }

    componentDidMount() {
        this.fetchAndUpdateDataState();
    }

    componentDidUpdate(oldProps: IMetadataListProps<T>) {
        if (oldProps !== this.props) {
            if (oldProps.componentType !== this.props.componentType) {
                // only fetch new data if component type changes
                this.fetchAndUpdateDataState();
            }
            if (oldProps.config !== this.props.config) {
                this.setState({
                    config: this.mergeBaseAndUserConfig()
                });
            }
        }
    }

    /**
     * Returns the names of the columns to be rendered
     * as specified in the config.
     *
     * @private
     * @returns {Array<AttributeOf<T>>}
     * @memberof MetadataList
     */
    private getColumnNamesFromConfig(): Array<AttributeOf<T>> {
        const result = [];
        const componentConfig = this.state.config[this.props.componentType];
        if (componentConfig) {
            for (const columnName in componentConfig.columns) {
                result.push(columnName);
            }
        }
        return result;
    }

    /**
     * Helper function to return the config for a particular column
     * in the current component type's config.
     *
     * @private
     * @param {string} columnName
     * @returns {IColumnConfig<T, DataType>}
     * @memberof MetadataList
     */
    private getColumnConfig(columnName: string): IColumnConfig<T, DataType> {
        const componentConfig = this.state.config[this.props.componentType];
        if (componentConfig) {
            return componentConfig.columns[columnName];
        }
        return null;
    }

    /**
     * Called every time a new selection is made on the list.
     * Notifies the host with the selected rows.
     *
     * @private
     * @memberof MetadataList
     */
    private onSelectionChanged(): void {
        const items: any[] = this.selection.getSelection();
        const selectionCount = this.selection.getSelectedCount();
        store.dispatch({ type: 'selectedRows', text: selectionCount });
        store.dispatch({ type: 'contactList', text: items });
        this.props.onStateChanged();
        const selectedRows: Array<ContractOf<T>> = items.map((item) => this.rawMetadata[item.rawIndex]);
        if (this.props.onSelectChange) {
            this.props.onSelectChange(selectedRows);
        }
    }

    /**
     * Returns a new MetadataListConfig object with the result of merging
     * the base config and config passed through the props (user config).
     *
     * @private
     * @returns {IMetadataListConfig}
     * @memberof MetadataList
     */
    private mergeBaseAndUserConfig(): IMetadataListConfig {
        const result: IMetadataListConfig = { ...baseConfig };
        for (const componentName in baseConfig) {
            const baseComponentConfig: IComponentConfig<ComponentType> = baseConfig[componentName];
            const userComponentConfig: IComponentConfig<ComponentType> = this.props.config[componentName];
            if (userComponentConfig) {
                result[componentName] = ({
                    columns: {
                        ...baseComponentConfig.columns,
                        ...userComponentConfig.columns
                    },
                    options: {
                        ...baseComponentConfig.options,
                        ...userComponentConfig.options
                    }
                } as IComponentConfig<ComponentType>);
            }
        }
        return result;
    }

    /**
     * Makes calls to fetch new data
     * and then sets the data and columns state appropriately
     *
     * @private
     * @memberof MetadataList
     */
    private fetchAndUpdateDataState = () => {
        const columnNames = this.getColumnNamesFromConfig();
        const descriptionPromise = this.props.xrmApiClient.describeAsync(this.props.componentType);

        const dataSchemaPromise = this.props.xrmApiClient.fetchAttributesAsync(
            this.props.componentType
        );

        const dataPromise = this.props.xrmApiClient.fetchListAsync(
            this.props.componentType, null, columnNames
        );
        Promise.all([descriptionPromise, dataPromise]).then(values => {
            this.componentDescription = values[0];
            this.rawMetadata = values[1];
            this.setState({
                columns: this.transformDescriptionToColumns(this.componentDescription),
                data: this.transformDataToRows(this.rawMetadata),
                loading: false
            });
        });
    }
    /**
     * Returns column metadata to render the list control.
     * In the process, it extracts the information from the description passed to it
     * to generate metadata for each column specified in the config.
     *
     * @private
     * @param {DescriptionOf<T>} description
     * @returns {IColumn[]}
     * @memberof MetadataList
     */
    private transformDescriptionToColumns(description: DescriptionOf<T>): IColumn[] {
        if (!description) {
            return [];
        }
        const columnNames = this.getColumnNamesFromConfig();
        const attributes = description.Attributes;
        return columnNames.map((columnName) => {
            const columnDescription = attributes[columnName as string];
            const columnConfig = this.getColumnConfig(columnName);
            return {
                key: columnName,
                name: columnDescription.label,
                fieldName: columnName,
                minWidth: 100,
                maxWidth: columnConfig.columnWidth ?
                    MetadataList.columnWidthMap[columnConfig.columnWidth] : MetadataList.columnWidthMap.medium,
                isResizable: true,
                isSorted: false,
                isFiltered: false,
                onRender: (item: any) => {
                    if (columnName == "contactid") {
                        return <Link to="/new" onClick={this.SetContactId(item[columnName])}> {item[columnName]} </Link>
                    }
                    else {
                        return (item[columnName]);
                    }
                    //(
                    //    <Link key={item.fullname} onClick={this.openEditForm(item.contactid, item.firstname, item.lastname, item.emailaddress1, item.telephone1)}>
                    //        {item.fullname}
                    //    </Link>


                    //);
                }
            };
        });
    }
    /**
     * Transforms metadata rows into items which the List control understands.
     * In the process, it transforms (without mutating the raw metadata passed to it)
     * each value in each row using transformations provided in the config.
     *
     * @private
     * @param {Array<ContractOf<T>>} metadata
     * @returns
     * @memberof MetadataList
     */
    private transformDataToRows(metadata: Array<ContractOf<T>>): IItem[] {
        return metadata.map((item, index) => {
            const itemCopy: IItem = Object.assign({}, item); // we don't want to mutate the original array
            itemCopy.filterOn = [];
            for (const columnName in itemCopy) {
                let preTransformedvalue = itemCopy[columnName];
                let postTransformedValue = itemCopy[columnName];
                const columnConfig = this.getColumnConfig(columnName);
                if (columnConfig && columnConfig.transform) {
                    postTransformedValue = columnConfig.transform(preTransformedvalue, item);
                    itemCopy[columnName] = postTransformedValue;
                }
                /**
                 * Do post-transform check for string type first,
                 * which always return the value we want to show.
                 * If post-transform data type is not string,
                 * check for pre-transform value
                 */
                if (typeof postTransformedValue === "string") {
                    itemCopy.filterOn.push(postTransformedValue);
                } else if (typeof preTransformedvalue === "string") {
                    itemCopy.filterOn.push(preTransformedvalue);
                }
            }
            itemCopy.rawIndex = index;
            return itemCopy;
        });
    }

    private getSelectionMode(): SelectionMode {
        const componentConfig = this.state.config[this.props.componentType];
        if (componentConfig) {
            const selectionMode = componentConfig.options
                && componentConfig.options.selection
                && componentConfig.options.selection.selectionMode;
            switch (selectionMode) {
                case "multiple": return SelectionMode.multiple;
                case "single": return SelectionMode.single;
                default: return SelectionMode.none;
            }
        }
        return SelectionMode.none;
    }

    private enableMarqueeSelection(): boolean {
        const componentConfig = this.state.config[this.props.componentType];
        return componentConfig &&
            componentConfig.options
            && componentConfig.options.selection
            && componentConfig.options.selection.enableMarqueeSelection;
    }
    public SetContactId = (contactid: string): () => void => {
        return (): void => {
            store.dispatch({ type: "contactid", text: contactid });
        };
    }
    // private _selection = new Selection({
    //     onSelectionChanged: () => {
    //         const selectionCount = this._selection.getSelectedCount();
    //         store.dispatch({ type: 'selectedRows', text: selectionCount });
    //     }
    // });
    private _onItemInvoked(item: string): void {
        // alert(`Item invoked: ${item}`);
        // store.dispatch({type: 'contactList', text: item });
    }
    render() {
        // const list = (
        //     <DetailsList
        //         items={this.state.data}
        //         columns={this.state.columns}
        //         isLoading={this.state.loading}
        //         selection={this.selection}
        //         selectionMode={this.getSelectionMode()}
        //         filter={this.props.filter.userFilter}
        //         onRenderItemColumn={this.props.renderItemColumn}
        //         selectionPreservedOnEmptyClick={true}
        //         ariaLabelForSelectionColumn='Toggle selection'
        //         ariaLabelForSelectAllCheckbox='Toggle selection for all items'
        //         onItemInvoked={this._onItemInvoked}
        //     />);

        // // add marquee wrapper selection
        // const listWithMarqueeSelection = (
        //     <MarqueeSelection selection={this.selection}>
        //         {list}
        //     </MarqueeSelection>
        // );

        // return (
        //     <Fabric>
        //         {this.enableMarqueeSelection() && this.getSelectionMode() === SelectionMode.multiple ? listWithMarqueeSelection : list}
        //     </Fabric>
        // );
        return (
            <MarqueeSelection selection={this.selection}>
                <DetailsList
                    items={this.state.data}
                    columns={this.state.columns}
                    setKey='set'
                    selection={this.selection}
                    selectionPreservedOnEmptyClick={true}
                    ariaLabelForSelectionColumn='Toggle selection'
                    ariaLabelForSelectAllCheckbox='Toggle selection for all items'
                    onItemInvoked={item => this._onItemInvoked(item.contactid)}
                />
            </MarqueeSelection>
        )
    }
}
