import { HoloHashMap } from '@holochain-open-dev/utils';
import merge from 'lodash-es/merge';
import isEqual from 'lodash-es/isEqual';
import { writable, derived, get } from 'svelte/store';
import { decode } from '@msgpack/msgpack';
import { defaultConfig } from './config';
export class ProfilesStore {
    constructor(service, config = {}) {
        this.service = service;
        /** Private */
        this._knownProfilesStore = writable(new HoloHashMap());
        this.config = merge(defaultConfig, config);
        this.myAgentPubKey = service.cellClient.cell.cell_id[1];
    }
    /** Actions */
    /**
     * Fetches the profiles for all agents in the DHT
     *
     * Warning! Can be very slow
     */
    async fetchAllProfiles() {
        const allProfiles = await this.service.getAllProfiles();
        this._knownProfilesStore.update(profiles => {
            for (const record of allProfiles) {
                profiles.put(record.signed_action.hashed.content.author, decode(record.entry.Present.entry));
            }
            return profiles;
        });
        return derived(this._knownProfilesStore, i => i);
    }
    /**
     * Fetches the profile for the given agent
     */
    async fetchAgentProfile(agentPubKey) {
        // For now, optimistic return of the cached profile
        // TODO: implement cache invalidation
        const knownProfiles = get(this._knownProfilesStore);
        if (!knownProfiles.get(agentPubKey)) {
            const record = await this.service.getAgentProfile(agentPubKey);
            if (record) {
                this._knownProfilesStore.update(profiles => {
                    profiles.put(record.signed_action.hashed.content.author, decode(record.entry.Present.entry));
                    return profiles;
                });
            }
        }
        return derived(this._knownProfilesStore, profiles => profiles.get(agentPubKey));
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
        const profilesToFetch = agentPubKeys.filter(pubKey => !knownProfiles.has(pubKey));
        if (profilesToFetch.length > 0) {
            const fetchedProfiles = await this.service.getAgentsProfiles(profilesToFetch);
            this._knownProfilesStore.update(profiles => {
                for (const fetchedProfile of fetchedProfiles) {
                    profiles.put(fetchedProfile.signed_action.hashed.content.author, decode(fetchedProfile.entry.Present.entry));
                }
                return profiles;
            });
        }
        return derived(this._knownProfilesStore, knownProfiles => knownProfiles.pick(a => !!agentPubKeys.find(pubkey => isEqual(pubkey, a))));
    }
    /**
     * Fetch my profile
     *
     * You can subscribe to `myProfile` to get updated with my profile
     */
    async fetchMyProfile() {
        const profile = await this.service.getMyProfile();
        if (profile) {
            this._knownProfilesStore.update(profiles => {
                profiles.put(profile.signed_action.hashed.content.author, decode(profile.entry.Present.entry));
                return profiles;
            });
        }
        return derived(this._knownProfilesStore, s => s.get(this.myAgentPubKey));
    }
    /**
     * Search the profiles for the agent with nicknames starting with the given nicknamePrefix
     *
     * @param nicknamePrefix must be of at least 3 characters
     * @returns the profiles with the nickname starting with nicknamePrefix
     */
    async searchProfiles(nicknamePrefix) {
        const searchedProfiles = await this.service.searchProfiles(nicknamePrefix);
        const byPubKey = new HoloHashMap();
        this._knownProfilesStore.update(profiles => {
            for (const profile of searchedProfiles) {
                byPubKey.put(profile.signed_action.hashed.content.author, decode(profile.entry.Present.entry));
                profiles.put(profile.signed_action.hashed.content.author, decode(profile.entry.Present.entry));
            }
            return profiles;
        });
        return byPubKey;
    }
    /**
     * Create my profile
     *
     * Note that there is no guarantee on nickname uniqness
     *
     * @param profile profile to be created
     */
    async createProfile(profile) {
        await this.service.createProfile(profile);
        this._knownProfilesStore.update(profiles => {
            profiles.put(this.myAgentPubKey, profile);
            return profiles;
        });
    }
    /**
     * Update my profile
     *
     * @param profile profile to be created
     */
    async updateProfile(profile) {
        await this.service.updateProfile(profile);
        this._knownProfilesStore.update(profiles => {
            profiles.put(this.myAgentPubKey, profile);
            return profiles;
        });
    }
}
//# sourceMappingURL=profiles-store.js.map