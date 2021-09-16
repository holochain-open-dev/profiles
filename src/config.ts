export interface ProfilesConfig {
  zomeName: string;
  avatarMode: 'identicon' | 'avatar';
}

export const defaultConfig: ProfilesConfig = {
  zomeName: 'profiles',
  avatarMode: 'avatar',
};
