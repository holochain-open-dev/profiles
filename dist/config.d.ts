export interface ProfilesConfig {
    avatarMode: 'identicon' | 'avatar-required' | 'avatar-optional';
    additionalFields: string[];
    minNicknameLength: number;
}
export declare const defaultConfig: ProfilesConfig;
