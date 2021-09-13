import { serializeHash, } from '@holochain-open-dev/core-types';
import { ProfilesService } from './profiles-service';
import { writable, derived, get } from 'svelte/store';
export class ProfilesStore {
    constructor(cellClient, zomeName = 'profiles') {
        this.cellClient = cellClient;
        this.zomeName = zomeName;
        this._knownProfilesStore = writable({});
        /** Readable stores */
        this.knownProfiles = derived(this._knownProfilesStore, i => i);
        this.myProfile = derived(this._knownProfilesStore, profiles => profiles[this.myAgentPubKey]);
        this._service = new ProfilesService(cellClient, zomeName);
        this.myAgentPubKey = serializeHash(cellClient.cellId[1]);
    }
    profileOf(agentPubKey) {
        return derived(this._knownProfilesStore, profiles => profiles[agentPubKey]);
    }
    /** Actions */
    async fetchAllProfiles() {
        const allProfiles = await this._service.getAllProfiles();
        this._knownProfilesStore.update(profiles => {
            for (const profile of allProfiles) {
                profiles[profile.agent_pub_key] = profile.profile;
            }
            return profiles;
        });
    }
    async fetchAgentProfile(agentPubKey) {
        // For now, optimistic return of the cached profile
        // TODO: implement cache invalidation
        const knownProfiles = get(this._knownProfilesStore);
        if (knownProfiles[agentPubKey])
            return knownProfiles[agentPubKey];
        const profile = await this._service.getAgentProfile(agentPubKey);
        this._knownProfilesStore.update(profiles => {
            profiles[profile.agent_pub_key] = profile.profile;
            return profiles;
        });
        return profile.profile;
    }
    async fetchMyProfile() {
        const profile = await this._service.getMyProfile();
        if (profile) {
            this._knownProfilesStore.update(profiles => {
                profiles[profile.agent_pub_key] = profile.profile;
                return profiles;
            });
        }
    }
    async searchProfiles(nicknamePrefix) {
        const searchedProfiles = await this._service.searchProfiles(nicknamePrefix);
        this._knownProfilesStore.update(profiles => {
            for (const profile of searchedProfiles) {
                profiles[profile.agent_pub_key] = profile.profile;
            }
            return profiles;
        });
        return searchedProfiles;
    }
    async createProfile(profile) {
        await this._service.createProfile(profile);
        this._knownProfilesStore.update(profiles => {
            profiles[this.myAgentPubKey] = profile;
            return profiles;
        });
    }
}
//# sourceMappingURL=profiles-store.js.map