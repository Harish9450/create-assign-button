import {
    Attribute, AttributeOf, ComponentContract, ComponentType, ContractOf, DescriptionOf
} from "./../../temp/Contracts/ComponentContracts";

import {
    DataType, DataTypeContract
} from "./../../temp/Contracts/DataTypeContracts";

const adjectivesArray = ["delicious", "ostentatious", "ridiculous", "massive", "roasted", "enthusiastic", "excited", "exuberant", "smelly"];
const nounArray = ["diary", "bottle", "water", "tooth picks", "couch", "flag", "radio", "spider", "table", "toothbrush", "cat"];

const location = ["Seattle", "Chicago", "New York", "Las Vegas", "New Jersey","Los Angeles"];

const getRandomArrayValue = (stringArray: string[]): string => {
    return stringArray[Math.floor(Math.random() * stringArray.length)];
};

export const createMockComponentData = <T extends ComponentType>(
    componentType: T,
    componentDescription: DescriptionOf<T>,
    itemsCount: number,
    attributes?: Array<AttributeOf<T>>
): Array<ContractOf<T>> => {
    if (!componentDescription) {
        return [];
    }
    const result: Array<ContractOf<T>> = [];
    for (let i = 0; i < itemsCount; i++) {
        const item: any = {};
        for (const attributeName in componentDescription.Attributes) {
            if (componentDescription.Attributes.hasOwnProperty(attributeName)) {
                // only add attribute if requested
                if (attributes.indexOf(attributeName as AttributeOf<T>) >= 0) {
                    let value;
                    const attribute: Attribute<DataType> = componentDescription.Attributes[attributeName];
                    switch (attribute.type) {
                        case DataType.String: {
                            switch (attributeName) {
                                case "MetadataId": value = `item-${i.toString()}`; break;
                                case "LogicalName": value = nounArray[i % (nounArray.length)]; break;
                                case "DisplayName": value = getRandomArrayValue(location); break;
                                case "Description" : value = getRandomArrayValue(adjectivesArray) + " " + nounArray[i % (nounArray.length)];
                                                    break;
                                default: value = getRandomArrayValue(adjectivesArray) + " " + getRandomArrayValue(nounArray);
                            }
                            break;
                        }
                        case DataType.Number: value = Math.random() * 100; break;
                        case DataType.Date: value = Date.now() + Math.random() * 1000 * 60 * 60 * 24 * 100; break; // today + 1-100 days
                        case DataType.Boolean: value = getRandomArrayValue(["Yes", "No"]); break;
                        default: value = null;
                    }
                    item[attributeName] = value;
                }
            }
        }
        result.push(item);
    }
    return result;
};
