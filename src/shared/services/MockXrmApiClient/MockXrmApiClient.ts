import { ICDSApiClient } from "./../temp/CdsApiClient";

import {
    createMockComponentData
} from "./mocks/mockData";

import { ContextOf } from "../temp/ComponentConfigs/ConfigHelpers";
import {
    AttributeOf,
    ComponentContract,
    ComponentType, ContractOf, DescriptionOf, IPagingInfo
} from "../temp/Contracts/ComponentContracts";
import {
    mockComponentsDescription
} from "./mocks/mockDescription";

export class MockXrmApiClient implements ICDSApiClient {
    constructor(
        private description: ComponentContract = mockComponentsDescription
    ) { }

    async describeAsync<T extends ComponentType>(componentType: T): Promise<DescriptionOf<T>> {
        return this.description &&
            this.description[componentType];
    }

    async fetchListAsync<T extends ComponentType>(
        componentType: T,
        context?: ContextOf<T>,
        columns?: Array<AttributeOf<T>>,
        paging?: IPagingInfo
    ): Promise<Array<ContractOf<T>>> {

        // TODO cache responses based on context and componentType
        const componentDescription = await this.describeAsync(componentType);
        const componentData = createMockComponentData(componentType, componentDescription, 20, columns);
        return componentData;
    }

    async fetchAttributesAsync<T extends ComponentType>(
        componentType: T       
    ): Promise<Array<ContractOf<T>>>{
         // TODO cache responses based on context and componentType
         const componentDescription = await this.describeAsync(componentType);
         const columns= [];
         const componentData = createMockComponentData(componentType, componentDescription, 0, columns);
         return componentData;
    }

    async describeAllComponents(): Promise<ComponentContract> {
        return this.description;
    }
}
