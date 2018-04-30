import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, IButtonProps, CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { CdsApiClient, ITokenAuthentication } from '../../../shared/services/temp/CdsApiClient';
import { HostingEnvironment } from "../../../shared/services/temp/HostingEnvironment";
import { ComponentType } from "../../../shared/services/temp/Contracts/ComponentContracts";
import 'office-ui-fabric-react/lib/components/TextField/examples/TextField.Examples.scss.js'
import { auth } from "../../../shared/tokenConfig";
import * as Entities from '../../../shared/services/temp/Contracts/Entity';
import { BrowserRouter as Router, Link, Route, Redirect } from "react-router-dom";
import { store } from "../../../shared/store";

export interface IContact {
  firstname: string,
  middlename: string,
  lastname: string,
  telephone1: string,
  emailaddress1: string,
  address1_telephone1: string,
  address1_line1: string,
  address1_fax: string,
  address1_telephone2: string,
  address1_line2: string,
  address1_line3: string,
  address1_city: string,
  address1_postalcode: string,
  address1_stateorprovince: string
  preferredcontactmethodcode: string,
  jobtitle: string,
  address1_country: string
};

export interface IContactState {
  item: Entities.Contact;
}
let _item: Entities.Contact;
export interface IContactProps { recordData?: Entities.Contact, onNavigateGrid?: Function }
export class ContactEntityFormDetails extends React.Component<IContactProps, IContactState> {
  constructor(props) {
    super(props);
    const storeValue= store.getState();
    if (storeValue == "na") {
      _item = {
        firstname: null,
        middlename: null,
        lastname: null,
        telephone1: null,
        emailaddress1: null,
        address1_telephone1: null,
        address1_line1: null,
        address1_fax: null,
        address1_telephone2: null,
        address1_line2: null,
        address1_line3: null,
        address1_city: null,
        address1_postalcode: null,
        preferredcontactmethodcode: null,
        jobtitle: null,
        address1_country: null,
        address1_stateorprovince: null,
        contactid: null,
        fullname: null
      };
      this.state = { item: _item };
    }
    else {
      this.state = { item: _item };
    }

    this._addNewContact = this._addNewContact.bind(this);
  }
  public render() {
    // const { item } = this.state;
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'stretch', height: '40px' }}>
          <CommandBarButton
            data-automation-id='test2'
            iconProps={{ iconName: 'Save' }}
            onClick={this._addNewContact}
            text='Save'
          />
          <Link to="/list">
            <CommandBarButton
              data-automation-id='test2'
              iconProps={{ iconName: 'ChromeClose' }}
              text='Cancel'
            /></Link>
        </div>
        <div className="docs-TextFieldExample">
          <TextField
            label="First Name"
            underlined={true}
            required={true}
            placeholder="First Name is required"
            onGetErrorMessage={this._getErrorMessage}
            validateOnLoad={false}
            validateOnFocusOut={true}
            value={this.state.item.firstname}
            onChanged={e => this.handleTextInputChange(e, 'firstname')}
          />

          <TextField
            label="Middle Name"
            underlined={true}
            value={this.state.item.middlename}
            onChanged={e => this.handleTextInputChange(e, 'middlename')}
          />

          <TextField
            label="Last Name"
            underlined={true}
            required={true}
            placeholder="Last Name is required"
            validateOnLoad={false}
            onGetErrorMessage={this._getErrorMessage}
            validateOnFocusOut={true}
            value={this.state.item.lastname}
            onChanged={e => this.handleTextInputChange(e, 'lastname')}
          />
          <TextField
            underlined={true}
            label="Job Titile"
            value={this.state.item.jobtitle}
            onChanged={e => this.handleTextInputChange(e, 'jobtitle')}
          />

          <TextField
            label="Account Name"
            underlined={true}
          // value={this.state.item.ac}
          // onChanged={e=> this.handleTextInputChange(e, 'firstname')}
          />

          <TextField
            label="Email"
            underlined={true}
            value={this.state.item.emailaddress1}
            onChanged={e => this.handleTextInputChange(e, 'emailaddress1')}
          />

          <TextField
            label="Business Phone"
            underlined={true}
            value={this.state.item.address1_telephone1}
            onChanged={e => this.handleTextInputChange(e, 'address1_telephone1')}
          />

          <TextField
            label="Mobile Phone"
            underlined={true}
            value={this.state.item.address1_telephone2}
            onChanged={e => this.handleTextInputChange(e, 'address1_telephone2')}
          />

          <TextField
            label="Fax"
            underlined={true}
            value={this.state.item.address1_fax}
            onChanged={e => this.handleTextInputChange(e, 'address1_fax')}
          />
          <TextField
            label="Preferred Method of Contact"
            underlined={true}
            value={this.state.item.preferredcontactmethodcode}
            onChanged={e => this.handleTextInputChange(e, 'preferredcontactmethodcode')}
          />
          <TextField
            label="Address 1: Street 1"
            underlined={true}
            value={this.state.item.address1_line1}
            onChanged={e => this.handleTextInputChange(e, 'address1_line1')}
          />
          <TextField
            label="Address 1: Street 2"
            underlined={true}
            value={this.state.item.address1_line2}
            onChanged={e => this.handleTextInputChange(e, 'address1_line2')}
          />
          <TextField
            label="Address 1: Street 3"
            underlined={true}
            value={this.state.item.address1_line3}
            onChanged={e => this.handleTextInputChange(e, 'address1_line3')}
          />
          <TextField
            label="Address 1: City"
            underlined={true}
            value={this.state.item.address1_city}
            onChanged={e => this.handleTextInputChange(e, 'address1_city')}
          />
          <TextField
            label="Address 1: State/Province"
            underlined={true}
            value={this.state.item.address1_stateorprovince}
            onChanged={e => this.handleTextInputChange(e, 'address1_stateorprovince')}
          />
          <TextField
            label="Address 1: ZIP/Postal Code"
            underlined={true}
            value={this.state.item.address1_postalcode}
            onChanged={e => this.handleTextInputChange(e, 'address1_postalcode')}
          />
          <TextField
            label="Address 1: Country/Region"
            underlined={true}
            value={this.state.item.address1_country}
            onChanged={e => this.handleTextInputChange(e, 'address1_country')}
          />
        </div>
      </div>
    );
  }

  public _addNewContact() {
    const xrmApiClient = new CdsApiClient(auth, null, HostingEnvironment.TESTING);
    let componentType: ComponentType = "Contact";
    let params: any = this.state.item;
    params = JSON.stringify(params);
    delete params.contactid;
    if (this.state.item.contactid == null) {
      let responce: Promise<Boolean> = xrmApiClient.SaveNewRecord(componentType, params);
      if (responce) {
        alert("Contact saved successfully !!!");
      }
      else {
        alert("Error in action, Please try again later !!!");
      }
    }
    else {
      let responce: Promise<Boolean> = xrmApiClient.UpdateRecord(componentType, params, this.state.item.contactid);
      if (responce) {
        alert("Contact updated successfully !!!");
      }
      else {
        alert("Error in action, Please try again later !!!");
      }
    }
  }
  public handleTextInputChange(value: any, name: string) {
    this.state.item[name] = value;
  }
  public _getErrorMessage(value: string): string {
    return value.length > 0
      ? ''
      : ` Is required.`;
  }
}
export default ContactEntityFormDetails;