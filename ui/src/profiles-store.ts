import { AgentPubKeyMap, LazyHoloHashMap } from "@holochain-open-dev/utils";
import {
  asyncDeriveStore,
  asyncReadable,
  joinMap,
} from "@holochain-open-dev/stores";
import merge from "lodash-es/merge";
import { AgentPubKey } from "@holochain/client";
import { decode } from "@msgpack/msgpack";

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
  allProfiles = asyncDeriveStore([this.allAgents], ([agentsPubKeys]) => {
    for (const pubKey of agentsPubKeys) {
      this.agentsProfiles.get(pubKey);
    }
    return joinMap(this.agentsProfiles);
  });

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
  async searchProfiles(
    nicknamePrefix: string
  ): Promise<AgentPubKeyMap<Profile>> {
    const searchedAgents = await this.client.searchAgents(nicknamePrefix);
    const byPubKey: AgentPubKeyMap<Profile> = new AgentPubKeyMap();
    this._knownProfilesStore.update((profiles) => {
      for (const profile of searchedProfiles) {
        byPubKey.put(
          profile.signed_action.hashed.content.author,
          decode((profile.entry as any).Present.entry) as Profile
        );
        profiles.put(
          profile.signed_action.hashed.content.author,
          decode((profile.entry as any).Present.entry) as Profile
        );
      }
      return profiles;
    });

    return byPubKey;
  }
}
