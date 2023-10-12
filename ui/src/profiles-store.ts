import { LazyHoloHashMap, slice } from "@holochain-open-dev/utils";
import {
  asyncDeriveStore,
  AsyncReadable,
  asyncReadable,
  lazyLoadAndPoll,
  joinAsyncMap,
  lazyLoad,
  manualReloadStore,
} from "@holochain-open-dev/stores";
import { AgentPubKey } from "@holochain/client";

import { ProfilesClient } from "./profiles-client.js";
import { Profile } from "./types.js";
import { defaultConfig, ProfilesConfig } from "./config.js";

export class ProfilesStore {
  config: ProfilesConfig;

  constructor(
    public client: ProfilesClient,
    config: Partial<ProfilesConfig> = {}
  ) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * Fetches all the agents that have created a profile in the DHT
   */
  agentsWithProfile = lazyLoadAndPoll(
    () => this.client.getAgentsWithProfile(),
    1000
  );

  /**
   * Fetches the profiles for all agents in the DHT
   *
   * This will get slower as the number of agents in the DHT increases
   */
  allProfiles = asyncDeriveStore(
    this.agentsWithProfile,
    (agents) =>
      this.agentsProfiles(agents) as AsyncReadable<
        ReadonlyMap<AgentPubKey, Profile>
      >
  );

  // Fetches the profile for the given agent
  profiles = new LazyHoloHashMap((agent: AgentPubKey) =>
    asyncReadable<Profile | undefined>(async (set) => {
      const profile = await this.client.getAgentProfile(agent);
      set(profile);

      return this.client.onSignal((signal) => {
        if (this.client.client.myPubKey.toString() !== agent.toString()) return;
        if (!(signal.type === "EntryCreated" || signal.type === "EntryUpdated"))
          return;
        set(signal.app_entry);
      });
    })
  );

  // Fetches your profile
  myProfile = this.profiles.get(this.client.client.myPubKey);

  // Fetches the profiles for the given agents
  agentsProfiles(
    agents: Array<AgentPubKey>
  ): AsyncReadable<ReadonlyMap<AgentPubKey, Profile | undefined>> {
    return joinAsyncMap(slice(this.profiles, agents));
  }

  searchProfiles(
    searchFilter: string
  ): AsyncReadable<ReadonlyMap<AgentPubKey, Profile>> {
    return asyncDeriveStore(
      lazyLoad(async () => this.client.searchAgents(searchFilter)),
      (agents) =>
        this.agentsProfiles(agents) as AsyncReadable<
          ReadonlyMap<AgentPubKey, Profile>
        >
    );
  }
}
