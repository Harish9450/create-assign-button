import { DataType, DataTypeContract } from "./DataTypeContracts";
import { Entity, Position, Product, Contact, Task, Lead, Order, Invoice, Quote, Email, Appointment} from "./Entity";
import { Field } from "./Field";
import { Transformations } from "./Transformations";

export type Component = { [A: string]: DataType };

export type Attribute<TDataType extends DataType> = {
	label: string,
	type: TDataType,
	transformation?: Transformations
};

export type ComponentDescription<T extends Component> = {
	readonly DisplayName: string;
	readonly Attributes: { [A in keyof T]: Attribute<T[A]> };
	readonly Contract?: { [A in keyof T]?: DataTypeContract[T[A]] };
};

export type ComponentContract = {
	Entity?: ComponentDescription<Entity>,
	Position?: ComponentDescription<Position>,
	Product?: ComponentDescription<Product>,
	Task?: ComponentDescription<Task>,
	Order?: ComponentDescription<Order>,
	Lead?: ComponentDescription<Lead>,
	Email?: ComponentDescription<Email>,
	Field?: ComponentDescription<Field>,
	Contact?: ComponentDescription<Contact>,
	Invoice?: ComponentDescription<Invoice>,
	Quote?: ComponentDescription<Quote>,
	Appointment?: ComponentDescription<Appointment>,
};

export type ComponentType = keyof ComponentContract;
// export type ComponentType = "Entity" | "OptionSet" | "WebResource" | "Attribute";
export type DescriptionOf<T extends ComponentType> = ComponentContract[T];
export type ContractOf<T extends ComponentType> = ComponentContract[T]["Contract"];
export type AttributeOf<T extends ComponentType> = keyof ComponentContract[T]["Attributes"];

export interface IPagingInfo {
	skip: number;
	top: number;
}
