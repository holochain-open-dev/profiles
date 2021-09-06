import { CellClient } from '@holochain-open-dev/cell-client';
import { AgentProfile, Profile } from './types';
export declare class ProfilesService {
    cellClient: CellClient;
    zomeName: string;
    constructor(cellClient: CellClient, zomeName?: string);
    getMyProfile(): Promise<AgentProfile>;
    getAgentProfile(agentPubKey: string): Promise<AgentProfile>;
    searchProfiles(nicknamePrefix: string): Promise<Array<AgentProfile>>;
    getAllProfiles(): Promise<Array<AgentProfile>>;
    createProfile(profile: Profile): Promise<AgentProfile>;
    private callZome;
}
