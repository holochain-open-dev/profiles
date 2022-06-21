export interface ProfilesConfig {
  avatarMode: 'identicon' | 'avatar-required' | 'avatar-optional';
  additionalFields: string[];
  minNicknameLength: number;
}

export const defaultConfig: ProfilesConfig = {
  avatarMode: 'avatar-optional',
  additionalFields: [],
  minNicknameLength: 3,
};
