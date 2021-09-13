import { CellClient } from '@holochain-open-dev/cell-client';
import { AgentPubKeyB64, Dictionary } from '@holochain-open-dev/core-types';
import { ProfilesService } from './profiles-service';
import { AgentProfile, Profile } from './types';
import { Writable, Readable } from 'svelte/store';
export declare class ProfilesStore {
    protected cellClient: CellClient;
    protected zomeName: string;
    /** Private */
    _service: ProfilesService;
    _knownProfilesStore: Writable<Dictionary<Profile>>;
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
