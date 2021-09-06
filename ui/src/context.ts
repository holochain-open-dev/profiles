import { Context, createContext } from '@lit-labs/context';
import { ProfilesStore } from './profiles.store';

export const profilesStoreContext: Context<ProfilesStore> = createContext(
  'hc_zome_profiles/store'
);
