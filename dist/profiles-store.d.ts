import { CellClient } from '@holochain-open-dev/cell-client';
import { AgentPubKeyB64, Dictionary } from '@holochain-open-dev/core-types';
import { AgentProfile, Profile } from './types';
import { Readable } from 'svelte/store';
import { ProfilesConfig } from './config';
export declare class ProfilesStore {
    protected cellClient: CellClient;
    /** Private */
    private _service;
    private _knownProfilesStore;
    /** Static info */
    myAgentPubKey: AgentPubKeyB64;
    /** Readable stores */
    knownProfiles: Readable<Dictionary<Profile>>;
    myProfile: Readable<Profile>;
    profileOf(agentPubKey: AgentPubKeyB64): Readable<Profile>;
    config: ProfilesConfig;
    constructor(cellClient: CellClient, config?: Partial<ProfilesConfig>);
    /** Actions */
    /**
     * Fetches the profiles for all agents in the DHT
     *
     * You can subscribe to `knowProfiles` to get updated with all the profiles when this call is done
     *
     * Warning! Can be very slow
     */
    fetchAllProfiles(): Promise<void>;
    /**
     * Fetches the profile for the given agent
     */
    fetchAgentProfile(agentPubKey: AgentPubKeyB64): Promise<Profile | undefined>;
    /**
     * Fetches the profiles for the given agents in the DHT
     *
     * You can subscribe to knowProfiles to get updated with all the profiles when this call is done
     *
     * Use this over `fetchAgentProfile` when fetching multiple profiles, as it will be more performant
     */
    fetchAgentsProfiles(agentPubKeys: AgentPubKeyB64[]): Promise<void>;
    /**
     * Fetch my profile
     *
     * You can subscribe to `myProfile` to get updated with my profile
     */
    fetchMyProfile(): Promise<void>;
    /**
     * Search the profiles for the agent with nicknames starting with the given nicknamePrefix
     *
     * @param nicknamePrefix must be of at least 3 characters
     * @returns the profiles with the nickname starting with nicknamePrefix
     */
    searchProfiles(nicknamePrefix: string): Promise<AgentProfile[]>;
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
