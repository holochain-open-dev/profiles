import { createContext } from '@lit/context';

import { ProfilesStore } from './profiles-store.js';

export const profilesStoreContext = createContext<ProfilesStore>(
	'hc_zome_profiles/store',
);
