import {
  EntryRecord,
  HashType,
  LazyHoloHashMap,
  retype,
  slice,
} from "@holochain-open-dev/utils";
import { encode } from "@msgpack/msgpack";
import {
  Signal,
  collectionSignal,
  AsyncComputed,
  joinAsyncMap,
  AsyncState,
} from "@holochain-open-dev/signals";
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

  private agentsWithProfileLinks$ = collectionSignal(
    this.client,
    () => this.client.getAgentsWithProfile(),
    "PathToAgent"
  );

  /**
   * Fetches all the agents that have created a profile in the DHT
   */
  agentsWithProfile$ = new AsyncComputed(() => {
    const links = this.agentsWithProfileLinks$.get();
    if (links.status !== "completed") return links;

    const value = links.value.map((l) => retype(l.target, HashType.AGENT));
    return {
      status: "completed",
      value,
    };
  });

  /**
   * Fetches the profiles for all agents in the DHT
   *
   * This will get slower as the number of agents in the DHT increases
   */
  allProfiles$ = new AsyncComputed(() => {
    const agentsWithProfile = this.agentsWithProfile$.get();
    if (agentsWithProfile.status !== "completed") return agentsWithProfile;

    const allProfiles = slice(this.profiles$, agentsWithProfile.value);
    const value = joinAsyncMap(allProfiles);
    return {
      status: "completed",
      value,
    };
  });

  /**
   * Fetches the profile for the given agent
   */
  profiles$ = new LazyHoloHashMap((agent: AgentPubKey) => {
    let unsubscribe: (() => void) | undefined;
    const signal = new AsyncState<EntryRecord<Profile> | undefined>(
      { status: "pending" },
      {
        [Signal.subtle.watched]: async () => {
          const value = await this.client.getAgentProfile(agent);
          signal.set({
            status: "completed",
            value,
          });
          unsubscribe = this.client.onSignal((profilesSignal) => {
            if (this.client.client.myPubKey.toString() !== agent.toString())
              return;
            if (
              !(
                profilesSignal.type === "EntryCreated" ||
                profilesSignal.type === "EntryUpdated"
              )
            )
              return;
            const record = new EntryRecord<Profile>({
              entry: {
                Present: {
                  entry_type: "App",
                  entry: encode(profilesSignal.app_entry),
                },
              },
              signed_action: profilesSignal.action,
            });
            signal.set({
              status: "completed",
              value: record,
            });
          });
        },
        [Signal.subtle.unwatched]: () => {
          signal.set({ status: "pending" });
          unsubscribe?.();
        },
      }
    );
    return signal;
  });

  // Fetches the profile for the active agent
  myProfile$ = this.profiles$.get(this.client.client.myPubKey);
}
