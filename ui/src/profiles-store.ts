import { EntryRecord, LazyHoloHashMap } from "@holochain-open-dev/utils";
import { encode } from "@msgpack/msgpack";
import {
  AsyncReadable,
  asyncReadable,
  lazyLoad,
  sliceAndJoin,
  pipe,
  uniquify,
} from "@holochain-open-dev/stores";
import { AgentPubKey } from "@holochain/client";

import { ProfilesClient } from "./profiles-client.js";
import { Profile } from "./types.js";
import { defaultConfig, ProfilesConfig } from "./config.js";
import { areHashesArraysEqual } from "./utils.js";

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
  agentsWithProfile: AsyncReadable<AgentPubKey[]> = asyncReadable(
    async (set) => {
      let hashes: AgentPubKey[];
      const fetch = async () => {
        const nhashes = await this.client.getAgentsWithProfile();
        if (hashes === undefined || !areHashesArraysEqual(nhashes, hashes)) {
          hashes = uniquify(nhashes);
          set(hashes);
        }
      };
      await fetch();
      const interval = setInterval(() => fetch(), 4000);
      const unsubs = this.client.onSignal((signal) => {
        if (signal.type === "LinkCreated") {
          if ("AgentToProfile" in signal.link_type) {
            hashes = uniquify([...hashes, this.client.client.myPubKey]);
            set(hashes);
          }
        }
      });
      return () => {
        clearInterval(interval);
        unsubs();
      };
    }
  );

  /**
   * Fetches the profiles for all agents in the DHT
   *
   * This will get slower as the number of agents in the DHT increases
   */
  allProfiles = pipe(
    this.agentsWithProfile,
    (agents) =>
      this.agentsProfiles(agents) as AsyncReadable<
        ReadonlyMap<AgentPubKey, EntryRecord<Profile>>
      >
  );

  /**
   * Fetches the profile for the given agent
   */
  profiles = new LazyHoloHashMap((agent: AgentPubKey) =>
    asyncReadable<EntryRecord<Profile> | undefined>(async (set) => {
      const profile = await this.client.getAgentProfile(agent);
      set(profile);

      return this.client.onSignal((signal) => {
        if (this.client.client.myPubKey.toString() !== agent.toString()) return;
        if (!(signal.type === "EntryCreated" || signal.type === "EntryUpdated"))
          return;
        const record = new EntryRecord<Profile>({
          entry: {
            Present: {
              entry_type: "App",
              entry: encode(signal.app_entry),
            },
          },
          signed_action: signal.action,
        });
        set(record);
      });
    })
  );

  // Fetches your profile
  myProfile = this.profiles.get(this.client.client.myPubKey);

  // Fetches the profiles for the given agents
  agentsProfiles(
    agents: Array<AgentPubKey>
  ): AsyncReadable<ReadonlyMap<AgentPubKey, EntryRecord<Profile> | undefined>> {
    return sliceAndJoin(this.profiles, agents);
  }

  searchProfiles(
    searchFilter: string
  ): AsyncReadable<ReadonlyMap<AgentPubKey, EntryRecord<Profile>>> {
    return pipe(
      lazyLoad(async () => this.client.searchAgents(searchFilter)),
      (agents) =>
        this.agentsProfiles(agents) as AsyncReadable<
          ReadonlyMap<AgentPubKey, EntryRecord<Profile>>
        >
    );
  }
}
