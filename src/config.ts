export interface ProfilesConfig {
  zomeName: string;
  avatarMode: 'identicon' | 'avatar';
  additionalFields: string[];
  minNicknameLength: number;
}

export const defaultConfig: ProfilesConfig = {
  zomeName: 'profiles',
  avatarMode: 'avatar',
  additionalFields: [],
  minNicknameLength: 3,
};
