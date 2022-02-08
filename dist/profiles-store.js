import { serializeHash, } from '@holochain-open-dev/core-types';
import merge from 'lodash-es/merge';
import { ProfilesService } from './profiles-service';
import { writable, derived, get } from 'svelte/store';
import { defaultConfig } from './config';
export class ProfilesStore {
    constructor(cellClient, config = {}) {
        this.cellClient = cellClient;
        this._knownProfilesStore = writable({});
        /** Readable stores */
        // Store containing all the profiles that have been fetched
        // The key is the agentPubKey of the agent
        this.knownProfiles = derived(this._knownProfilesStore, i => i);
        // Store containing my profile
        this.myProfile = derived(this._knownProfilesStore, profiles => profiles[this.myAgentPubKey]);
        this.config = merge(defaultConfig, config);
        this._service = new ProfilesService(cellClient, this.config.zomeName);
        this.myAgentPubKey = serializeHash(cellClient.cellId[1]);
    }
    // Returns a store with the profile of the given agent
    profileOf(agentPubKey) {
        return derived(this._knownProfilesStore, profiles => profiles[agentPubKey]);
    }
    /** Actions */
    /**
     * Fetches the profiles for all agents in the DHT
     *
     * You can subscribe to `knowProfiles` to get updated with all the profiles when this call is done
     *
     * Warning! Can be very slow
     */
    async fetchAllProfiles() {
        const allProfiles = await this._service.getAllProfiles();
        this._knownProfilesStore.update(profiles => {
            for (const profile of allProfiles) {
                profiles[profile.agentPubKey] = profile.profile;
            }
            return profiles;
        });
    }
    /**
     * Fetches the profile for the given agent
     */
    async fetchAgentProfile(agentPubKey) {
        // For now, optimistic return of the cached profile
        // TODO: implement cache invalidation
        const knownProfiles = get(this._knownProfilesStore);
        if (knownProfiles[agentPubKey])
            return knownProfiles[agentPubKey];
        const profile = await this._service.getAgentProfile(agentPubKey);
        if (!profile)
            return;
        this._knownProfilesStore.update(profiles => {
            profiles[profile.agentPubKey] = profile.profile;
            return profiles;
        });
        return profile.profile;
    }
    /**
     * Fetches the profiles for the given agents in the DHT
     *
     * You can subscribe to knowProfiles to get updated with all the profiles when this call is done
     *
     * Use this over `fetchAgentProfile` when fetching multiple profiles, as it will be more performant
     */
    async fetchAgentsProfiles(agentPubKeys) {
        // For now, optimistic return of the cached profile
        // TODO: implement cache invalidation
        const knownProfiles = get(this._knownProfilesStore);
        const agentsWeAlreadKnow = Object.keys(knownProfiles);
        const profilesToFetch = agentPubKeys.filter(pubKey => !agentsWeAlreadKnow.includes(pubKey));
        if (profilesToFetch.length === 0) {
            return;
        }
        const fetchedProfiles = await this._service.getAgentsProfiles(profilesToFetch);
        this._knownProfilesStore.update(profiles => {
            for (const fetchedProfile of fetchedProfiles) {
                profiles[fetchedProfile.agentPubKey] = fetchedProfile.profile;
            }
            return profiles;
        });
    }
    /**
     * Fetch my profile
     *
     * You can subscribe to `myProfile` to get updated with my profile
     */
    async fetchMyProfile() {
        const profile = await this._service.getMyProfile();
        if (profile) {
            this._knownProfilesStore.update(profiles => {
                profiles[profile.agentPubKey] = profile.profile;
                return profiles;
            });
        }
    }
    /**
     * Search the profiles for the agent with nicknames starting with the given nicknamePrefix
     *
     * @param nicknamePrefix must be of at least 3 characters
     * @returns the profiles with the nickname starting with nicknamePrefix
     */
    async searchProfiles(nicknamePrefix) {
        const searchedProfiles = await this._service.searchProfiles(nicknamePrefix);
        this._knownProfilesStore.update(profiles => {
            for (const profile of searchedProfiles) {
                profiles[profile.agentPubKey] = profile.profile;
            }
            return profiles;
        });
        return searchedProfiles;
    }
    /**
     * Create my profile
     *
     * Note that there is no guarantee on nickname uniqness
     *
     * @param profile profile to be created
     */
    async createProfile(profile) {
        await this._service.createProfile(profile);
        this._knownProfilesStore.update(profiles => {
            profiles[this.myAgentPubKey] = profile;
            return profiles;
        });
    }
    /**
     * Update my profile
     *
     * @param profile profile to be created
     */
    async updateProfile(profile) {
        await this._service.updateProfile(profile);
        this._knownProfilesStore.update(profiles => {
            profiles[this.myAgentPubKey] = profile;
            return profiles;
        });
    }
}
//# sourceMappingURL=profiles-store.js.map