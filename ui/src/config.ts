export interface FieldConfig {
	name: string;
	label: string;
	required: boolean;
}

export interface ProfilesConfig {
	avatarMode: 'identicon' | 'avatar-required' | 'avatar-optional';
	additionalFields: FieldConfig[];
	minNicknameLength: number;
	linkDevicePasscodeLength: number;
}

export const defaultConfig: ProfilesConfig = {
	avatarMode: 'avatar-optional',
	additionalFields: [],
	minNicknameLength: 3,
	linkDevicePasscodeLength: 4,
};

export const TTL_CAP_GRANT = 60 * 1000; // 1 minute
