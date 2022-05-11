export interface ProfilesConfig {
  zomeName: string;
  avatarMode: 'identicon' | 'avatar-required' | 'avatar-optional';
  additionalFields: string[];
  minNicknameLength: number;
}

export const defaultConfig: ProfilesConfig = {
  zomeName: 'profiles',
  avatarMode: 'avatar-optional',
  additionalFields: [],
  minNicknameLength: 3,
};
