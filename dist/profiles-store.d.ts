import { HoloHashMap } from '@holochain-open-dev/utils';
import { Readable } from 'svelte/store';
import { AgentPubKey } from '@holochain/client';
import { ProfilesService } from './profiles-service';
import { Profile } from './types';
import { ProfilesConfig } from './config';
export declare class ProfilesStore {
    protected service: ProfilesService;
    /** Private */
    private _knownProfilesStore;
    /** Static info */
    myAgentPubKey: AgentPubKey;
    config: ProfilesConfig;
    constructor(service: ProfilesService, config?: Partial<ProfilesConfig>);
    /** Actions */
    /**
     * Fetches the profiles for all agents in the DHT
     *
     * Warning! Can be very slow
     */
    fetchAllProfiles(): Promise<Readable<HoloHashMap<Profile>>>;
    /**
     * Fetches the profile for the given agent
     */
    fetchAgentProfile(agentPubKey: AgentPubKey): Promise<Readable<Profile | undefined>>;
    /**
     * Fetches the profiles for the given agents in the DHT
     *
     * You can subscribe to knowProfiles to get updated with all the profiles when this call is done
     *
     * Use this over `fetchAgentProfile` when fetching multiple profiles, as it will be more performant
     */
    fetchAgentsProfiles(agentPubKeys: AgentPubKey[]): Promise<Readable<HoloHashMap<Profile>>>;
    /**
     * Fetch my profile
     *
     * You can subscribe to `myProfile` to get updated with my profile
     */
    fetchMyProfile(): Promise<Readable<Profile | undefined>>;
    /**
     * Search the profiles for the agent with nicknames starting with the given nicknamePrefix
     *
     * @param nicknamePrefix must be of at least 3 characters
     * @returns the profiles with the nickname starting with nicknamePrefix
     */
    searchProfiles(nicknamePrefix: string): Promise<HoloHashMap<Profile>>;
    /**
     * Create my profile
     *
     * Note that there is no guarantee on nickname uniqness
     *
     * @param profile profile to be created
     */
    createProfile(profile: Profile): Promise<void>;
    /**
     * Update my profile
     *
     * @param profile profile to be created
     */
    updateProfile(profile: Profile): Promise<void>;
}
