import {EntryRecord, GetonlyMap} from '@holochain-open-dev/utils';
import { encode } from '@msgpack/msgpack';
import {
  AsyncReadable,
  asyncReadable,
  lazyLoad,
  sliceAndJoin,
  pipe,
  derived,
  NotFoundError,
  AsyncStatus,
} from '@holochain-open-dev/stores';
import { AgentPubKey, LazyHoloHashMap } from '@holochain/client';

import { ProfilesClient } from './profiles-client.js';
import { Profile } from './types.js';
import { defaultConfig, ProfilesConfig } from './config.js';
import { uniquify } from './stores.js';
// @ts-ignore
import isEqual from 'lodash-es/isEqual.js';

export function catchNotFoundError<T>(
  store: AsyncReadable<T>
): AsyncReadable<T | undefined> {
  return derived(store, asyncStatus => {
    if (asyncStatus.status !== 'error') return asyncStatus;

    if (asyncStatus.error instanceof NotFoundError)
      return {
        status: 'complete',
        value: undefined,
      } as AsyncStatus<undefined>;
    return asyncStatus;
  });
}

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
  agentsWithProfile: AsyncReadable<AgentPubKey[]> = asyncReadable(async set => {
    let hashes: AgentPubKey[];
    const fetch = async (local: boolean) => {
      const nhashes = await this.client.getAgentsWithProfile(local);
      if (!isEqual(nhashes, hashes)) {
        hashes = uniquify(nhashes);
        set(hashes);
      }
    };
    // Fetch with `GetStrategy::Local` first
    await fetch(true);
    const interval = setInterval(
      () =>
        fetch(false).catch(e => {
          console.warn('Failed to fetch agents with profile:', e);
        }),
      4000
    );
    const unsubs = this.client.onSignal(signal => {
      if (signal.type === 'LinkCreated') {
        if ('AgentToProfile' === signal.link_type) {
          hashes = uniquify([...hashes, this.client.client.myPubKey]);
          set(hashes);
        }
      }
    });
    return () => {
      clearInterval(interval);
      unsubs();
    };
  });

  /**
   * Fetches the profiles for all agents in the DHT
   *
   * This will get slower as the number of agents in the DHT increases
   */
  allProfiles = pipe(
    this.agentsWithProfile,
    agents =>
      this.agentsProfiles(agents) as AsyncReadable<
        ReadonlyMap<AgentPubKey, EntryRecord<Profile>>
      >
  );

  /**
   * Fetches the profile for the given agent
   */
  profiles = new LazyHoloHashMap((agent: AgentPubKey) =>
    asyncReadable<EntryRecord<Profile> | undefined>(async set => {
      let profile = await this.client.getAgentProfile(agent, true);
      // If we don't find it locally, try over the newtork
      // Note that this means we only discover the latest profiles of
      // others via gossip, i.e. if someone changes their profile
      // and it hasn't gossiped to us, we will find one via
      // GetStrategy::Local and will skip going to the network.
      if (!profile) {
        profile = await this.client.getAgentProfile(agent, true);
      }
      set(profile);

      return this.client.onSignal(signal => {
        if (this.client.client.myPubKey.toString() !== agent.toString()) return;
        if (!(signal.type === 'EntryCreated' || signal.type === 'EntryUpdated'))
          return;
        const record = new EntryRecord<Profile>({
          entry: {
            Present: {
              entry_type: 'App',
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
  myProfile = this.profiles.get(this.client.client.myPubKey)!;

  // Fetches the profiles for the given agents
  agentsProfiles(
    agents: Array<AgentPubKey>
  ): AsyncReadable<ReadonlyMap<AgentPubKey, EntryRecord<Profile> | undefined>> {
    return sliceAndJoin(this.profiles as GetonlyMap<any, any>, agents);
  }

  searchProfiles(
    searchFilter: string,
    local?: boolean
  ): AsyncReadable<ReadonlyMap<AgentPubKey, EntryRecord<Profile>>> {
    return pipe(
      lazyLoad(async () => this.client.searchAgents(searchFilter, local)),
      agents =>
        this.agentsProfiles(agents) as AsyncReadable<
          ReadonlyMap<AgentPubKey, EntryRecord<Profile>>
        >
    );
  }
}
