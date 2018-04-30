export enum DataType {
	String = "String",
	Number = "Number",
	Date = "Date",
	Boolean = "Boolean",
	// LocalizedString = "LocalizedString",
	FieldType = "FieldType",
	Enum = "Enum",
}

/*
export type LocalizedString = {
	value: string,
	translations: {}
};*/

export type DataTypeContract = {
	String: string,
	Number: number,
	Date: Date,
	Boolean: boolean,
	// LocalizedString: LocalizedString,
	FieldType: "String" | "Number",
	Enum: Enum
};

export type Enum = {
	Label: string;
	Value: string | number;
};
