import { ComponentType } from "../Contracts/ComponentContracts";
import { DataType } from "../Contracts/DataTypeContracts";
import { EntityConfig, PositionConfig, ProductConfig, TaskConfig, LeadConfig, OrderConfig, InvoiceConfig, QuoteConfig, EmailConfig, ContactConfig, AppointmentConfig } from "./EntityComponentConfig";

// tslint:disable-next-line:typedef
export const ComponentConfigs = {
	Entity: EntityConfig,
	Position: PositionConfig,
	Product: ProductConfig,
	Task: TaskConfig,
	Field: EntityConfig,
	Lead: LeadConfig,
	Order: OrderConfig,
	Invoice: InvoiceConfig,
    Quote: QuoteConfig,
	Email: EmailConfig,
	Contact: ContactConfig,	
	Appointment: AppointmentConfig
};

export type ContextOf<T extends ComponentType> = {
	solutionId: string;
	parentComponentId?: string;
	componentId?: string;
};
