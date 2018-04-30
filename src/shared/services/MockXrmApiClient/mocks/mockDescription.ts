import {
    Config
} from "./../../temp/ComponentConfigs/ComponentConfig";
import {
    Attribute, AttributeOf, Component, ComponentContract, ComponentType, ContractOf, DescriptionOf
} from "./../../temp/Contracts/ComponentContracts";

import { DataType } from "./../../temp/Contracts/DataTypeContracts";

export const mockComponentsDescription: ComponentContract = {
        Entity: {
            DisplayName: "Entity",
            Attributes: {
                MetadataId: { label: "Id", type: DataType.String },
                LogicalName: { label: "Name", type: DataType.String },
                SchemaName: { label: "Schema Name", type: DataType.String },
                DisplayName: { label: "Display Name", type: DataType.String, transformation: "ReadLocalizationLabel" },
                Description: { label: "Description", type: DataType.String, transformation: "ReadLocalizationLabel" },
                IsCustomizable: {label: "Customizable", type: DataType.Boolean, transformation: "ReadIsCustomizable" }
            }
        },
        Field: {
            DisplayName: "Field",
            Attributes: {
                AttributeType: { label: "Id", type: DataType.FieldType },
                CreatedBy: { label: "Name", type: DataType.String },
                DisplayName: { label: "Display Name", type: DataType.String },
            }
        },
    Contact: {
        DisplayName: "Contact",
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
};
