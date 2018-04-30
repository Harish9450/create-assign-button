import { DataType } from "../Contracts/DataTypeContracts";
import { Entity, Position, Invoice, Quote  } from "../Contracts/Entity";
import { Config } from "./ComponentConfig";

const getEntitiesBaseFilter: string = `IsIntersect eq false and IsLogicalEntity eq false and
PrimaryNameAttribute ne null and PrimaryNameAttribute ne '' and ObjectTypeCode gt 0 and
ObjectTypeCode ne 4712 and ObjectTypeCode ne 4724 and ObjectTypeCode ne 9933 and ObjectTypeCode ne 9934 and
ObjectTypeCode ne 9935 and ObjectTypeCode ne 9947 and ObjectTypeCode ne 9945 and ObjectTypeCode ne 9944 and
ObjectTypeCode ne 9942 and ObjectTypeCode ne 9951 and ObjectTypeCode ne 2016 and ObjectTypeCode ne 9949 and
ObjectTypeCode ne 9866 and ObjectTypeCode ne 9867 and ObjectTypeCode ne 9868 and
(IsCustomizable/Value eq true or IsCustomEntity eq true or IsManaged eq false or IsMappable/Value eq true or IsRenameable/Value eq true)`;

const EntityConfig: Config<"Entity"> = {
	endpoints: {
		List: {
			endpoint: "EntityDefinitions",
			filter: getEntitiesBaseFilter,
			/*viewFilter: new Map([
				["all", "(IsCustomizable/Value eq true or IsCustomEntity eq true or IsManaged eq false or IsMappable/Value eq true or IsRenameable/Value eq true)"],
				["customizable", "IsCustomizable/Value eq true"],
				["custom", "IsCustomEntity eq true"]
			]),*/
		}
	},
	component: {
		DisplayName: "Entity",  // Lookup label
		Attributes: {
			MetadataId: { label: "Id", type: DataType.String },
			LogicalName: { label: "Name", type: DataType.String },
			SchemaName: { label: "Schema Name", type: DataType.String },
			DisplayName: { label: "Display Name", type: DataType.String, transformation: "ReadLocalizationLabel" },
			Description: { label: "Description", type: DataType.String, transformation: "ReadLocalizationLabel" },
			IsCustomizable: { label: "Customizable", type: DataType.Boolean, transformation: "ReadIsCustomizable" }
		}
	}
}

const PositionConfig: Config<"Position"> = {
	endpoints: {
		List: {
			endpoint: "positions",
		}
	},
	component: {
		DisplayName: "Position",  // Lookup label
		Attributes: {
			name: { label: "Name", type: DataType.String },
			positionid: { label: "Position Id", type: DataType.Number },
			parentpositionid: { label: "Paret Position Id", type: DataType.Number },
			description: { label: "Description", type: DataType.String }
		}
	}
}

const ProductConfig: Config<"Product"> = {
	endpoints: {
		List: {
			endpoint: "products",
		}
	},
	component: {
		DisplayName: "Product",  // Lookup label
		Attributes: {
			name: { label: "Name", type: DataType.String },
			productid: { label: "Product Id", type: DataType.String },
			hierarchypath: { label: "Hierarchy Path", type: DataType.String },
			validfromdate: { label: "Valid From", type: DataType.Date },
			validtodate: { label: "Valid To", type: DataType.Date },
			statuscode: { label: "Status", type: DataType.Number },
			productstructure: { label: "Product Structure", type: DataType.Number }
		}
	}
}

const LeadConfig: Config<"Lead"> = {
	endpoints: {
		List: {
			endpoint: "leads",
		}
	},
	component: {
		DisplayName: "Lead",  // Lookup label
		Attributes: {
			fullname: { label: "Fullname", type: DataType.String },
			subject: { label: "Subject", type: DataType.String },
			createdon: { label: "Created on", type: DataType.Date },
			modifiedon: { label: "Modified on", type: DataType.Date },
			statuscode: { label: "Status code", type: DataType.Number },
			leadid: { label: "Lead ID", type: DataType.String }
		}
	}
}

const OrderConfig: Config<"Order"> = {
	endpoints: {
		List: {
			endpoint: "salesorders",
		}
	},
	component: {
		DisplayName: "Order",  // Lookup label
		Attributes: {
			name: { label: "Name", type: DataType.String },
			ordernumber: { label: "Order No.", type: DataType.Number },
			prioritycode: { label: "Priority Code", type: DataType.Number }
		}
	}
}

const EmailConfig: Config<"Email"> = {
	endpoints: {
		List: {
			endpoint: "emails",
		}
	},
	component: {
		DisplayName: "Email",  // Lookup label
		Attributes: {
			subject: { label: "Name", type: DataType.String },
			activityid: { label: "Order No.", type: DataType.String },
			prioritycode: { label: "Priority Code", type: DataType.Number }
		}
	}
}

const TaskConfig: Config<"Task"> = {
	endpoints: {
		List: {
			endpoint: "tasks",
		}
	},
	component: {
		DisplayName: "Task",  // Lookup label
		Attributes: {
			activityid: { label: "Activity Id", type: DataType.String },
			description: { label: "Description", type: DataType.String },
			subject: { label: "Subject", type: DataType.Date },
			prioritycode: { label: "Priority", type: DataType.String },
			statuscode: { label: "Status", type: DataType.Number }
		}
	}
}

const ContactConfig: Config<"Contact"> = {
	endpoints: {
		List: {
			endpoint: "contacts",
		}
	},
	component: {
		DisplayName: "Contacts",  // Lookup label
		Attributes: {
			contactid: { label: "Contact Id", type: DataType.String },
			fullname: { label: "Full Name", type: DataType.String },
			firstname: { label: "first name", type: DataType.String },
			lastname: { label: "last name", type: DataType.String },
			middlename: { label: "last name", type: DataType.String },
			telephone1: { label: "Phone", type: DataType.String },
			emailaddress1: { label: "Email", type: DataType.String },
			address1_telephone1: { label: "Bisness Phone", type: DataType.String },
			address1_line1: { label: "Address Line 1", type: DataType.String },
			address1_fax: { label: "Fax", type: DataType.String },
			address1_telephone2: { label: "Mobile Phone", type: DataType.String },
			address1_line2: { label: "Address Line 2", type: DataType.String },
			address1_line3: { label: "Adddress Line 3", type: DataType.String },
			address1_city: { label: "City", type: DataType.String },
			address1_postalcode: { label: "zip", type: DataType.String },
			preferredcontactmethodcode: { label: "Type", type: DataType.Number },
			jobtitle: { label: "Job Title", type: DataType.String },
			address1_country: { label: "Country", type: DataType.String },
			address1_stateorprovince: { label: "State", type: DataType.String },
		}
	}
}

const InvoiceConfig: Config<"Invoice"> = {
	endpoints : {
		List: {
			endpoint: "invoices",
		}
	},
	component : {
		DisplayName: "Invoice",
		Attributes: {
			name: {label: "Name", type: DataType.String},
			invoiceid: {label:"Invoice Id", type: DataType.String},
			statuscode: {label: "Status Reason", type: DataType.Number},
			totalamount: {label: "Total Amount", type: DataType.Number},
			_customerid_value: {label: "Customer", type: DataType.String}
		}
	}
}

const QuoteConfig: Config<"Quote"> = {
	endpoints: {
		List: {
			endpoint: "quotes",
		}
	},
	component: {
		DisplayName: "Quote",  // Lookup label
		Attributes: {
			name: { label: "Name", type: DataType.String },
			statuscode: { label: "Status Code", type: DataType.Number },
			totalamount: { label: "Total Amount", type: DataType.String },
			createdon: { label: "Created Date", type: DataType.Date }
		}
	}
}

const AppointmentConfig: Config<"Appointment"> = {
	endpoints: {
		List: {
			endpoint: "appointments",
		}
	},
	component: {
		DisplayName: "Appointments",  // Lookup label
		Attributes: {
			subject: { label: "Subject", type: DataType.String },
			activityid: { label: "Activity Id", type: DataType.String },
			location: { label: "Location", type: DataType.String },
			description: { label: "Description", type: DataType.String },
			prioritycode: { label: "Priority Code", type: DataType.Number },
			scheduledstart: { label: "Scheduled Start", type: DataType.String },
			scheduledend: { label: "Scheduled End", type: DataType.String },
			scheduleddurationminutes: { label: "Duration(min)", type: DataType.Number },
			isalldayevent: { label: "All Day Event", type: DataType.Boolean }
		}
	}
}

export { EntityConfig, PositionConfig, ProductConfig, TaskConfig, ContactConfig, LeadConfig, OrderConfig, InvoiceConfig, QuoteConfig, EmailConfig, AppointmentConfig };