import { DataType } from "./DataTypeContracts";

export type Entity = {
	MetadataId: DataType.String,
	LogicalName: DataType.String,
	SchemaName: DataType.String,
	DisplayName: DataType.String,
	Description: DataType.String,
	IsCustomizable: DataType.Boolean;
	/*LogicalCollectionName: DataType.String;
	ObjectTypeCode: DataType.Number;
	PrimaryNameAttribute: DataType.String;
	PrimaryIdAttribute: DataType.String;
	IsActivity: DataType.Boolean;
	IsActivityParty: DataType.Boolean;
	WorkflowSupport: DataType.String;
	HasStateCode: DataType.Boolean;
	IsBPFEntity: DataType.Boolean;
	IsChildEntity: DataType.Boolean;
	IsValidForAdvancedFind: DataType.Boolean;
	DisplayCollectionName: DataType.String;
	IsConnectionsEnabled: DataType.Boolean;
	CanTriggerWorkflow: DataType.Boolean;
	CanModifyAuditSettings: DataType.Boolean;
	IsEnabledForTrace: DataType.Boolean;
	IsDocumentManagementEnabled: DataType.Boolean;
	IsManaged: DataType.Boolean;
	OwnershipType: DataType.Enum; // EntityOwnershipType;
	IsCustomEntity: DataType.Boolean;
	IconSmallName: DataType.String;
	IsKnowledgeManagementEnabled: DataType.Boolean;
	IsStateModelAware: DataType.Boolean;
	EnforceStateTransitions: DataType.Boolean;*/
};

export type Position = {
	name: DataType.String,
	positionid: DataType.Number,
	parentpositionid: DataType.Number,
	description: DataType.String;
}
export type Assign = {
	Target: DataType.String,
	contactid: DataType.String,
	Assignee: DataType.String,
}

export type Product = {
	name: DataType.String,
	productid: DataType.String,
	hierarchypath: DataType.String,
	validfromdate?: DataType.Date,
	validtodate?: DataType.Date,
	statuscode: DataType.Number,
	productstructure: DataType.Number
}

export type Task = {
	activityid: DataType.String,
	description: DataType.String,
	subject?: DataType.Date,
	prioritycode?: DataType.String,
	statuscode: DataType.Number
}

export type Lead = {
	fullname: DataType.String,
	subject: DataType.String,
	createdon: DataType.Date,
	modifiedon: DataType.Date,
	statuscode: DataType.Number,
	leadid: DataType.String
}

export type Order = {
	name: DataType.String,
	ordernumber: DataType.Number,
	prioritycode: DataType.Number;
}

export type Invoice = {
	name: DataType.String,
	invoiceid: DataType.String,
	statuscode: DataType.Number,
	totalamount: DataType.Number,
	_customerid_value: DataType.String
}

export type Quote = {
	name: DataType.String,
	statuscode: DataType.Number,
	totalamount: DataType.String,
	createdon: DataType.Date
	// Quoteid: DataType.Number
}

export type Email = {
	subject: DataType.String,
	activityid: DataType.String,
	prioritycode: DataType.Number;
}

export type Appointment = {
	subject: DataType.String,
	activityid: DataType.String,
	location: DataType.String,
	description: DataType.String,
	prioritycode: DataType.Number,
	scheduledstart: DataType.String,
	scheduledend: DataType.String,
	scheduleddurationminutes: DataType.Number,
	isalldayevent: DataType.Boolean
}
export type Contact = {
    // @odata.etag: W/\8763994\,
    contactid: DataType.String,
    fullname: DataType.String,
    firstname: DataType.String,
    middlename: DataType.String,
    lastname: DataType.String,
    telephone1: DataType.String,
    emailaddress1: DataType.String,
    address1_telephone1:  DataType.String,
    address1_line1:  DataType.String,
    address1_fax:  DataType.String,
    address1_telephone2:  DataType.String,
    address1_line2:  DataType.String,
    address1_line3:  DataType.String,
    address1_city:  DataType.String,
    address1_postalcode:  DataType.String,
    preferredcontactmethodcode:  DataType.Number,
    jobtitle:  DataType.String,
    address1_country:  DataType.String,
    address1_stateorprovince:  DataType.String
};