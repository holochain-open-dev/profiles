export interface ProfilesConfig {
    zomeName: string;
    avatarMode: 'identicon' | 'avatar';
    additionalFields: string[];
    minNicknameLength: number;
}
export declare const defaultConfig: ProfilesConfig;
