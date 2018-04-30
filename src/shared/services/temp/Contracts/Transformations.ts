export function ReadLocalizationLabel(localizationLabel: LocalizationLabel): string {
	if (localizationLabel && localizationLabel.UserLocalizedLabel && localizationLabel.UserLocalizedLabel.Label) {
		return localizationLabel.UserLocalizedLabel.Label;
	}

	return "";
}

export type Label = {
	Label: string;
	LanguageCode?: number,
	IsManaged?: boolean,
	MetadataId: string,
	HasChanged?: boolean;
};

export type LocalizationLabel = {
	LocalizedLabels: Label[],
	UserLocalizedLabel: Label
};

export function ReadIsCustomizable(isCustomizable: IsCustomizable): boolean {
	if (isCustomizable && isCustomizable.Value) {
		return isCustomizable.Value;
	}

	return false;
}

export type IsCustomizable = {
	Value?: boolean;
	CanBeChanged?: boolean;
	ManagedPropertyLogicalName: string;
};

export const TransformationMap = {
	ReadLocalizationLabel,
	ReadIsCustomizable
};

export type Transformations = keyof typeof TransformationMap;
