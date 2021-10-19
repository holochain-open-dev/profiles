import { CellClient } from '@holochain-open-dev/cell-client';
import { AgentPubKeyB64 } from '@holochain-open-dev/core-types';
import { AgentProfile, Profile } from './types';
export declare class ProfilesService {
    cellClient: CellClient;
    zomeName: string;
    constructor(cellClient: CellClient, zomeName?: string);
    getMyProfile(): Promise<AgentProfile>;
    getAgentProfile(agentPubKey: AgentPubKeyB64): Promise<AgentProfile>;
    getAgentsProfiles(agentPubKeys: AgentPubKeyB64[]): Promise<AgentProfile[]>;
    searchProfiles(nicknamePrefix: string): Promise<Array<AgentProfile>>;
    getAllProfiles(): Promise<Array<AgentProfile>>;
    createProfile(profile: Profile): Promise<AgentProfile>;
    private callZome;
}
