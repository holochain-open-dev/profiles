export interface FieldConfig {
	name: string;
	label: string;
	required: boolean;
}

export interface ProfilesConfig {
	avatarMode: 'identicon' | 'avatar-required' | 'avatar-optional';
	additionalFields: FieldConfig[];
	minNicknameLength: number;
	passnumberLength: number;
}

export const defaultConfig: ProfilesConfig = {
	avatarMode: 'avatar-optional',
	additionalFields: [],
	minNicknameLength: 3,
	passnumberLength: 6,
};
