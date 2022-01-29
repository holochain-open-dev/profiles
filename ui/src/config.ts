export interface ProfilesConfig {
  zomeName: string;
  avatarMode: 'identicon' | 'avatar';
  additionalFields: string[];
}

export const defaultConfig: ProfilesConfig = {
  zomeName: 'profiles',
  avatarMode: 'avatar',
  additionalFields: [],
};
