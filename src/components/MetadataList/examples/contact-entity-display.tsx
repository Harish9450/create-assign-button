import { boolean, select } from "@storybook/addon-knobs/react";
import * as React from "react";
import { MockXrmApiClient } from "../../../shared/services/MockXrmApiClient";
import { MetadataList } from "./../MetadataList";
import { auth } from "../../../shared/tokenConfig";
import { CdsApiClient, ITokenAuthentication } from "../../../shared/services/temp/CdsApiClient";
import { HostingEnvironment } from "../../../shared/services/temp/HostingEnvironment";
import { DefaultButton, PrimaryButton, IButtonProps, CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { BrowserRouter as Router, Link, Route, Redirect } from "react-router-dom";
import { store } from "../../../shared/store";
var Modal = require('react-modal');
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import * as Entities from '../../../shared/services/temp/Contracts/Entity';
import {
    BaseComponent,
    assign
} from 'office-ui-fabric-react/lib/Utilities';
import {
    CompactPeoplePicker,
    IBasePickerSuggestionsProps,
    IBasePicker,
    ListPeoplePicker,
    NormalPeoplePicker,
    ValidationState
} from 'office-ui-fabric-react/lib/Pickers';
import { IPersonaProps, Persona } from 'office-ui-fabric-react/lib/Persona';
// import { Modal } from 'react-modal';

export interface IPeoplePickerExampleState {
    currentPicker?: number | string;
    delayResults?: boolean;
    peopleList: IPersonaProps[];
    currentSelectedItems?: IPersonaProps[];
}

const suggestionProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested People',
    mostRecentlyUsedHeaderText: 'Suggested Contacts',
    noResultsFoundText: 'No results found',
    loadingText: 'Loading',
    showRemoveButtons: true,
    suggestionsAvailableAlertText: 'People Picker Suggestions available',
    suggestionsContainerAriaLabel: 'Suggested contacts'
};

const limitedSearchAdditionalProps: IBasePickerSuggestionsProps = {
    searchForMoreText: 'Load all Results',
    resultsMaximumNumber: 10,
    searchingText: 'Searching...'
};

const limitedSearchSuggestionProps: IBasePickerSuggestionsProps = assign(limitedSearchAdditionalProps, suggestionProps);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
export class ContactEntityDisplay extends React.Component<{}, {
    hideDialog: boolean;
    ShowAssign?: boolean;
    hideTeam: boolean;
    sysuserid?: string;
    options: any[],
    currentSelectedItems?: IPersonaProps[];
}> {
    constructor(props) {
        super(props);
        this.state = {
            ShowAssign: store.getState().SelectedRowsCount > 0 ? false : true,
            hideDialog: true,
            options: [{ key: "", text: "" }],
            hideTeam: true
        };
    }

    componentWillMount() {
        Modal.setAppElement("body");
    }

    private _showDialog = (): void => {
        this.setState({ hideDialog: false });
    }

    private _closeDialog = (): void => {
        this.setState({ hideDialog: true });
    }

    private _onChoiceChanged() {
        console.log('Choice option change');
    }
    private _onChangeUser = (text: any) => {
        this.setState({ sysuserid: text });
    }
    private _onChangeAssignto = (text: any) => {
        if (text == "B") {
            const xrmApiClient = new CdsApiClient(auth, null, HostingEnvironment.TESTING);
            var endpoint: string = "systemusers";
            var select: string = "systemuserid,fullname,address1_telephone1,businessunitid,siteid,title,internalemailaddress,address1_fax,positionid";
            var filter: string = "accessmode ne 3 and isdisabled eq false and accessmode ne 5";
            var orderby: string = "fullname asc";
            const dataPromise = xrmApiClient.fetchUserListAsync(endpoint, select, filter, orderby)
            var _user: any[] = [];
            Promise.all([dataPromise]).then(values => {
                for (var i = 0; i < values[0].length; i++) {
                    _user.push({ key: values[0][i].systemuserid, text: values[0][i].fullname });
                }
            });
            endpoint = "teams";
            select = null;
            filter = null;
            orderby = null;
            const dataPromise1 = xrmApiClient.fetchUserListAsync(endpoint, select, filter, orderby)
            Promise.all([dataPromise1]).then(values => {
                for (var i = 0; i < values[0].length; i++) {
                    _user.push({ key: values[0][i].teamid, text: values[0][i].name });
                }
            });
            this.setState({
                options: _user,
                hideTeam: false,
                currentSelectedItems: _user
            });
        }
        else if (text == "A") {
            this.setState({ sysuserid: "6fb6e6f3-9a43-e811-a959-000d3a37d076", hideTeam: true });
        }
    }
    AssignContact = () => {
        const xrmApiClient = new CdsApiClient(auth, null, HostingEnvironment.TESTING);
        var list = store.getState().contactList;
        var count = 0;
        for (var i = 0; i < list.length; i++) {
            var params = {
                "Target": {
                    "@odata.type": "Microsoft.Dynamics.CRM.contact",
                    "contactid": list[i].contactid // "f50fca94-eb44-e811-a959-000d3a365e68"
                },
                "Assignee": {
                    "@odata.type": "Microsoft.Dynamics.CRM.systemuser",
                    "systemuserid": this.state.sysuserid //"6fb6e6f3-9a43-e811-a959-000d3a37d076"
                }
            }
            var newParams: string = JSON.stringify(params);
            let responce: Promise<Boolean> = xrmApiClient.Assign(newParams);
            if (responce) {
                count++;
            }
        }
        if (count > 0) {
            alert("Assigned successfully !!!");
            this._closeDialog();
        }
        else {
            alert("Error in action, Please try again later !!!");
        }
    }
    public onStateChanged = () => {
        this.setState({ ShowAssign: store.getState().SelectedRowsCount > 0 ? false : true, });
    }
    private _onFilterChanged = () => {
        return [];
    }
    private _getTextFromItem(persona: IPersonaProps): string {
        return persona.primaryText as string;
    }
    private _onItemsChange = (items: any[]): void => {
        this.setState({
            currentSelectedItems: items
        });
    }
    public render() {
        const xrmApiClient = new CdsApiClient(auth, null, HostingEnvironment.TESTING);
        return (
            <div>
                <div>
                    <Dialog
                        hidden={this.state.hideDialog}
                        onDismiss={this._closeDialog}
                        dialogContentProps={{
                            type: DialogType.largeHeader,
                            title: 'Assign Contact',
                            subText: 'You have selected 1 Contact. To whom would you like to assign it?'
                        }}
                        modalProps={{
                            isBlocking: false,
                            containerClassName: 'ms-dialogMainOverride'
                        }}
                    >
                        <div className='docs-DropdownExample'>
                            {/* <NormalPeoplePicker
                                onResolveSuggestions={this._onFilterChanged}
                                getTextFromItem={this._getTextFromItem}
                                pickerSuggestionsProps={suggestionProps}
                                className={'ms-PeoplePicker'}
                                key={'controlled'}
                                onChange={this._onItemsChange}
                                inputProps={{
                                    onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
                                    onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called')
                                }}
                                resolveDelay={300}
                            /> */}
                            <Dropdown
                                label='Assign to:'
                                required={true}
                                id='Customdrop2'
                                ariaLabel='Me and User'
                                onChanged={e => this._onChangeAssignto(e.key)}
                                defaultSelectedKey="A"
                                options={
                                    [
                                        { key: 'A', text: 'Me', data: { icon: 'Memo' }, },
                                        { key: 'B', text: 'User or Team', data: { icon: 'Print' } },
                                    ]
                                }
                            />
                            <Dropdown
                                placeHolder='Select an Option'
                                label='User or Team:'
                                id='Customdrop1'
                                ariaLabel='User or Team'
                                disabled={this.state.hideTeam}
                                options={this.state.options}
                                onChanged={e => this._onChangeUser(e.key)}
                            />

                        </div>
                        <DialogFooter>
                            <PrimaryButton onClick={this.AssignContact} text='Assign' />
                            <DefaultButton onClick={this._closeDialog} text='Cancel' />
                        </DialogFooter>
                    </Dialog>
                </div>
                <div style={{ display: 'flex', alignItems: 'stretch', height: '30px' }}>
                    <Link to="/new">
                        <CommandBarButton
                            data-automation-id='test2'
                            iconProps={{ iconName: 'Add' }}
                            text='New'
                        />
                    </Link> &nbsp;
                <CommandBarButton
                        data-automation-id='test2'
                        iconProps={{ iconName: 'Assign' }}
                        text='Assign'
                        disabled={this.state.ShowAssign}
                        onClick={this._showDialog}
                    />
                </div>
                <br />
                <div>
                    <MetadataList componentType="Contact" xrmApiClient={xrmApiClient} onStateChanged={item => this.onStateChanged()} />
                </div>
            </div>
        );
    }
}

