import { DataType } from "./DataTypeContracts";

export type Field = {
    DisplayName: DataType.String,
    CreatedBy: DataType.String,
    AttributeType: DataType.FieldType
};
