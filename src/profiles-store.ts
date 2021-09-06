import { CellClient } from '@holochain-open-dev/cell-client';
import {
  AgentPubKeyB64,
  Dictionary,
  serializeHash,
} from '@holochain-open-dev/core-types';

import { ProfilesService } from './profiles-service';
import { AgentProfile, Profile } from './types';
import { writable, Writable, derived, Readable, get } from 'svelte/store';

export interface ProfilesStore {
  /** Static info */
  myAgentPubKey: AgentPubKeyB64;

  /** Readable stores */
  knownProfiles: Readable<Dictionary<Profile>>;
  myProfile: Readable<Profile>;

  /** Actions */
  fetchAllProfiles: () => Promise<void>;
  fetchAgentProfile: (agentPubKey: AgentPubKeyB64) => Promise<Profile>;
  fetchMyProfile: () => Promise<void>;
  searchProfiles: (nicknamePrefix: string) => Promise<AgentProfile[]>;
  createProfile: (profile: Profile) => Promise<void>;
}

const fetchAllProfiles =
  (
    service: ProfilesService,
    knownProfilesStore: Writable<Dictionary<Profile>>
  ) =>
  async () => {
    const allProfiles = await service.getAllProfiles();

    knownProfilesStore.update(profiles => {
      for (const profile of allProfiles) {
        profiles[profile.agent_pub_key] = profile.profile;
      }
      return profiles;
    });
  };

const fetchAgentProfile =
  (
    service: ProfilesService,
    knownProfilesStore: Writable<Dictionary<Profile>>
  ) =>
  async (agentPubKey: string): Promise<Profile> => {
    // For now, optimistic return of the cached profile
    // TODO: implement cache invalidation

    const knownProfiles = get(knownProfilesStore);

    if (knownProfiles[agentPubKey]) return knownProfiles[agentPubKey];

    const profile = await service.getAgentProfile(agentPubKey);

    knownProfilesStore.update(profiles => {
      profiles[profile.agent_pub_key] = profile.profile;
      return profiles;
    });
    return profile.profile;
  };

const fetchMyProfile =
  (
    service: ProfilesService,
    knownProfilesStore: Writable<Dictionary<Profile>>
  ) =>
  async () => {
    const profile = await service.getMyProfile();
    if (profile) {
      knownProfilesStore.update(profiles => {
        profiles[profile.agent_pub_key] = profile.profile;
        return profiles;
      });
    }
  };

const searchProfiles =
  (
    service: ProfilesService,
    knownProfilesStore: Writable<Dictionary<Profile>>
  ) =>
  async (nicknamePrefix: string): Promise<AgentProfile[]> => {
    const searchedProfiles = await service.searchProfiles(nicknamePrefix);

    knownProfilesStore.update(profiles => {
      for (const profile of searchedProfiles) {
        profiles[profile.agent_pub_key] = profile.profile;
      }
      return profiles;
    });
    return searchedProfiles;
  };

const createProfile =
  (
    service: ProfilesService,
    knownProfilesStore: Writable<Dictionary<Profile>>,
    myAgentPubKey: AgentPubKeyB64
  ) =>
  async (profile: Profile): Promise<void> => {
    await service.createProfile(profile);

    knownProfilesStore.update(profiles => {
      profiles[myAgentPubKey] = profile;
      return profiles;
    });
  };

export function createProfilesStore(
  cellClient: CellClient,
  zomeName = 'profiles'
): ProfilesStore {
  const knownProfilesStore: Writable<Dictionary<Profile>> = writable({});

  const service = new ProfilesService(cellClient, zomeName);

  const myAgentPubKey = serializeHash(cellClient.cellId[1]);

  const myProfile: Readable<Profile> = derived(
    knownProfilesStore,
    profiles => profiles[myAgentPubKey]
  );

  return {
    myAgentPubKey,
    knownProfiles: derived(knownProfilesStore, profiles => profiles),
    myProfile,
    fetchAllProfiles: fetchAllProfiles(service, knownProfilesStore),
    fetchAgentProfile: fetchAgentProfile(service, knownProfilesStore),
    fetchMyProfile: fetchMyProfile(service, knownProfilesStore),
    searchProfiles: searchProfiles(service, knownProfilesStore),
    createProfile: createProfile(service, knownProfilesStore, myAgentPubKey),
  };
}
