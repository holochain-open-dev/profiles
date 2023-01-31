import { LazyHoloHashMap, pickBy, slice } from "@holochain-open-dev/utils";
import {
  asyncDeriveStore,
  AsyncReadable,
  asyncReadable,
  joinMap,
  lazyLoad,
  lazyLoadAndPoll,
} from "@holochain-open-dev/stores";
import merge from "lodash-es/merge";
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
    this.config = merge(defaultConfig, config);
  }

  /**
   * Fetches all the agents that have created a profile in the DHT
   */
  agentsWithProfile = lazyLoadAndPoll(
    () => this.client.getAgentsWithProfile(),
    100
  );

  /**
   * Fetches the profiles for all agents in the DHT
   *
   * This will get slower as the number of agents in the DHT increases
   */
  allProfiles = asyncDeriveStore(
    [this.agentsWithProfile],
    ([agentsPubKeys]) =>
      joinMap(slice(this.agentsProfiles, agentsPubKeys)) as AsyncReadable<
        ReadonlyMap<AgentPubKey, Profile>
      >
  );

  // Fetches the profile for the given agent
  agentsProfiles = new LazyHoloHashMap((agent: AgentPubKey) =>
    asyncReadable<Profile | undefined>(async (set) => {
      const profile = await this.client.getAgentProfile(agent);
      set(profile);

      return this.client.on("signal", (signal) => {
        if (this.client.client.myPubKey.toString() !== agent.toString()) return;
        if (!(signal.type === "EntryCreated" || signal.type === "EntryUpdated"))
          return;
        set(signal.app_entry);
      });
    })
  );

  // Fetches your profile
  myProfile = this.agentsProfiles.get(this.client.client.myPubKey);

  /**
   * Search the profiles for the agent with nicknames starting with the given nicknamePrefix
   *
   * @param nicknameFilter must be of at least 3 characters
   * @returns the profiles with the nickname starting with nicknameFilter
   */
  searchProfiles(
    nicknameFilter: string
  ): AsyncReadable<ReadonlyMap<AgentPubKey, Profile>> {
    const searchAgents = lazyLoad(() =>
      this.client.searchAgents(nicknameFilter)
    );
    return asyncDeriveStore([searchAgents], ([agentsPubKeys]) =>
      joinMap(slice(this.agentsProfiles, agentsPubKeys))
    ) as AsyncReadable<ReadonlyMap<AgentPubKey, Profile>>;
  }
}
