import { LazyHoloHashMap, ReadHoloHashMap } from "@holochain-open-dev/utils";
import {
  asyncDeriveStore,
  AsyncReadable,
  asyncReadable,
  joinMap,
  lazyLoad,
} from "@holochain-open-dev/stores";
import merge from "lodash-es/merge";
import { AgentPubKey } from "@holochain/client";

import { ProfilesClient } from "./profiles-client";
import { Profile } from "./types";
import { defaultConfig, ProfilesConfig } from "./config";

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
  allAgents = asyncReadable<AgentPubKey[]>(async (set) => {
    const allAgents = await this.client.getAllAgents();
    set(allAgents);
  });

  /**
   * Fetches the profiles for all agents in the DHT
   *
   * This will get slower as the number of agents in the DHT increases
   */
  allProfiles = asyncDeriveStore([this.allAgents], ([agentsPubKeys]) =>
    joinMap(this.agentsProfiles.select(agentsPubKeys))
  );

  agentsProfiles = new LazyHoloHashMap((agent: AgentPubKey) =>
    asyncReadable<Profile | undefined>(async (set) => {
      const profile = await this.client.getAgentProfile(agent);
      set(profile);

      return this.client.on("ProfileCreated", (profile) => {
        if (this.client.client.myPubKey.toString() === agent.toString()) {
          set(profile);
        }
      });
    })
  );

  myProfile = this.agentsProfiles.get(this.client.client.myPubKey);

  /**
   * Search the profiles for the agent with nicknames starting with the given nicknamePrefix
   *
   * @param nicknamePrefix must be of at least 3 characters
   * @returns the profiles with the nickname starting with nicknamePrefix
   */
  searchProfiles(
    nicknamePrefix: string
  ): AsyncReadable<ReadHoloHashMap<AgentPubKey, Profile>> {
    const searchAgents = lazyLoad(() =>
      this.client.searchAgents(nicknamePrefix)
    );
    return asyncDeriveStore([searchAgents], ([agentsPubKeys]) =>
      joinMap(this.agentsProfiles.select(agentsPubKeys))
    ) as AsyncReadable<ReadHoloHashMap<AgentPubKey, Profile>>;
  }
}
