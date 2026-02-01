export interface FieldConfig {
  name: string;
  label: string;
  required: boolean;
}

export interface ProfilesConfig {
  avatarMode: 'identicon' | 'avatar-required' | 'avatar-optional';
  additionalFields: FieldConfig[];
  minNicknameLength: number;
  /** Whether to use local-only gets (true) or network gets (false). Defaults to true (local). */
  getLocal: boolean;
  /** Interval in milliseconds for polling agents with profile. Defaults to 4000. */
  pollIntervalMs: number;
}

export const defaultConfig: ProfilesConfig = {
  avatarMode: 'avatar-optional',
  additionalFields: [],
  minNicknameLength: 3,
  getLocal: true,
  pollIntervalMs: 4000,
};
