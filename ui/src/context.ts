import { Context, createContext } from '@holochain-open-dev/context';
import { ProfilesStore } from './profiles-store';

export const profilesStoreContext: Context<ProfilesStore> = createContext(
  'hc_zome_profiles/store'
);
