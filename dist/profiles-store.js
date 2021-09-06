import { serializeHash, } from '@holochain-open-dev/core-types';
import { ProfilesService } from './profiles-service';
import { writable, derived, get } from 'svelte/store';
const fetchAllProfiles = (service, knownProfilesStore) => async () => {
    const allProfiles = await service.getAllProfiles();
    knownProfilesStore.update(profiles => {
        for (const profile of allProfiles) {
            profiles[profile.agent_pub_key] = profile.profile;
        }
        return profiles;
    });
};
const fetchAgentProfile = (service, knownProfilesStore) => async (agentPubKey) => {
    // For now, optimistic return of the cached profile
    // TODO: implement cache invalidation
    const knownProfiles = get(knownProfilesStore);
    if (knownProfiles[agentPubKey])
        return knownProfiles[agentPubKey];
    const profile = await service.getAgentProfile(agentPubKey);
    knownProfilesStore.update(profiles => {
        profiles[profile.agent_pub_key] = profile.profile;
        return profiles;
    });
    return profile.profile;
};
const fetchMyProfile = (service, knownProfilesStore) => async () => {
    const profile = await service.getMyProfile();
    if (profile) {
        knownProfilesStore.update(profiles => {
            profiles[profile.agent_pub_key] = profile.profile;
            return profiles;
        });
    }
};
const searchProfiles = (service, knownProfilesStore) => async (nicknamePrefix) => {
    const searchedProfiles = await service.searchProfiles(nicknamePrefix);
    knownProfilesStore.update(profiles => {
        for (const profile of searchedProfiles) {
            profiles[profile.agent_pub_key] = profile.profile;
        }
        return profiles;
    });
    return searchedProfiles;
};
const createProfile = (service, knownProfilesStore, myAgentPubKey) => async (profile) => {
    await service.createProfile(profile);
    knownProfilesStore.update(profiles => {
        profiles[myAgentPubKey] = profile;
        return profiles;
    });
};
export function createProfilesStore(cellClient, zomeName = 'profiles') {
    const knownProfilesStore = writable({});
    const service = new ProfilesService(cellClient, zomeName);
    const myAgentPubKey = serializeHash(cellClient.cellId[1]);
    const myProfile = derived(knownProfilesStore, profiles => profiles[myAgentPubKey]);
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
//# sourceMappingURL=profiles-store.js.map