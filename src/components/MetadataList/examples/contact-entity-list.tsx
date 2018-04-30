import * as React from "react";
import { CdsApiClient, ITokenAuthentication } from "../../../shared/services/temp/CdsApiClient";
import { HostingEnvironment } from "../../../shared/services/temp/HostingEnvironment";
import { MetadataList } from "./../MetadataList";
import { auth } from "../../../shared/tokenConfig";
import { DefaultButton, IButtonProps, CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { ContactEntityFormDetails } from './contact-entity-form';
import * as Entities from '../../../shared/services/temp/Contracts/Entity'
import { ContactEntityDisplay } from "./contact-entity-display";
import { BrowserRouter as Router, Link, Route, Redirect } from "react-router-dom";


enum contactStates {
    ShowGrid, ShowEditForm
}
export interface IContactRoute {
    appState: contactStates
    editRecord?: Entities.Contact
}

export class ContactEntityList extends React.Component<{ onNavigateEditForm: Function }, IContactRoute> {
    constructor(props, state: IContactRoute) {
        super(props);
        this.state = {
            appState: contactStates.ShowGrid,
            editRecord: null
        };
        this.navigateToNewForm = this.navigateToNewForm.bind(this);
        this.navigateToGrid = this.navigateToGrid.bind(this);
    }
    
    public navigateToGrid() {
        this.setState({
            editRecord: null,
            appState: contactStates.ShowGrid
        });
    }
    public navigateToNewForm() {
        this.setState({
            appState: contactStates.ShowEditForm,
            editRecord: null
        });
    }
    public render() {
        const xrmApiClient = new CdsApiClient(auth, null, HostingEnvironment.TESTING);
        return (
            <ContactEntityDisplay />);
    }
}

