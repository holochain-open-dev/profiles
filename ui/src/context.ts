import { createContext } from "@lit/context";
import { ProfilesStore } from "./profiles-store";

export const profilesStoreContext = createContext<ProfilesStore>(
  "hc_zome_profiles/store"
);
