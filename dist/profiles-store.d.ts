import { CellClient } from '@holochain-open-dev/cell-client';
import { AgentPubKeyB64, Dictionary } from '@holochain-open-dev/core-types';
import { AgentProfile, Profile } from './types';
import { Readable } from 'svelte/store';
export declare class ProfilesStore {
    protected cellClient: CellClient;
    protected zomeName: string;
    /** Private */
    private _service;
    private _knownProfilesStore;
    /** Static info */
    myAgentPubKey: AgentPubKeyB64;
    /** Readable stores */
    knownProfiles: Readable<Dictionary<Profile>>;
    myProfile: Readable<Profile>;
    profileOf(agentPubKey: AgentPubKeyB64): Readable<Profile>;
    constructor(cellClient: CellClient, zomeName?: string);
    /** Actions */
    fetchAllProfiles(): Promise<void>;
    fetchAgentProfile(agentPubKey: AgentPubKeyB64): Promise<Profile>;
    fetchMyProfile(): Promise<void>;
    searchProfiles(nicknamePrefix: string): Promise<AgentProfile[]>;
    createProfile(profile: Profile): Promise<void>;
}
