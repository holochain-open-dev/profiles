import { createContext } from '@lit-labs/context';
import { ProfilesStore } from './profiles-store';

export const profilesStoreContext = createContext<ProfilesStore>(
  'hc_zome_profiles/store'
);
