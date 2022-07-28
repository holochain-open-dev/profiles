import { CellClient } from '@holochain-open-dev/cell-client';
import { AgentPubKey, Record } from '@holochain/client';
import { Profile } from './types';
export declare class ProfilesService {
    cellClient: CellClient;
    zomeName: string;
    constructor(cellClient: CellClient, zomeName?: string);
    /**
     * Get my profile, if it has been created
     * @returns my profile
     */
    getMyProfile(): Promise<Record>;
    /**
     * Get the profile for the given agent, if they have created it
     *
     * @param agentPubKey the agent to get the profile for
     * @returns the profile of the agent
     */
    getAgentProfile(agentPubKey: AgentPubKey): Promise<Record | undefined>;
    /**
     * Get the profiles for the given agent
     *
     * @param agentPubKeys the agents to get the profile for
     * @returns the profile of the agents, in the same order as the input parameters
     */
    getAgentsProfiles(agentPubKeys: AgentPubKey[]): Promise<Record[]>;
    /**
     * Search profiles that start with nicknamePrefix
     *
     * @param nicknamePrefix must be of at least 3 characters
     * @returns the profiles with the nickname starting with nicknamePrefix
     */
    searchProfiles(nicknamePrefix: string): Promise<Array<Record>>;
    /**
     * Get the profiles for all the agents in the DHT
     *
     * @returns the profiles for all the agents in the DHT
     */
    getAllProfiles(): Promise<Record[]>;
    /**
     * Create my profile
     *
     * @param profile the profile to create
     * @returns my profile with my agentPubKey
     */
    createProfile(profile: Profile): Promise<Record>;
    /**
     * Update my profile
     *
     * @param profile the profile to create
     * @returns my profile with my agentPubKey
     */
    updateProfile(profile: Profile): Promise<Record>;
    private callZome;
}
