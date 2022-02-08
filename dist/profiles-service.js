export class ProfilesService {
    constructor(cellClient, zomeName = 'profiles') {
        this.cellClient = cellClient;
        this.zomeName = zomeName;
    }
    /**
     * Get my profile, if it has been created
     * @returns my profile
     */
    async getMyProfile() {
        return this.callZome('get_my_profile', null);
    }
    /**
     * Get the profile for the given agent, if they have created it
     *
     * @param agentPubKey the agent to get the profile for
     * @returns the profile of the agent
     */
    async getAgentProfile(agentPubKey) {
        return this.callZome('get_agent_profile', agentPubKey);
    }
    /**
     * Get the profiles for the given agent
     *
     * @param agentPubKeys the agents to get the profile for
     * @returns the profile of the agents, in the same order as the input parameters
     */
    async getAgentsProfiles(agentPubKeys) {
        return this.callZome('get_agents_profile', agentPubKeys);
    }
    /**
     * Search profiles that start with nicknamePrefix
     *
     * @param nicknamePrefix must be of at least 3 characters
     * @returns the profiles with the nickname starting with nicknamePrefix
     */
    async searchProfiles(nicknamePrefix) {
        return this.callZome('search_profiles', {
            nicknamePrefix: nicknamePrefix,
        });
    }
    /**
     * Get the profiles for all the agents in the DHT
     *
     * @returns the profiles for all the agents in the DHT
     */
    async getAllProfiles() {
        return this.callZome('get_all_profiles', null);
    }
    /**
     * Create my profile
     *
     * @param profile the profile to create
     * @returns my profile with my agentPubKey
     */
    async createProfile(profile) {
        const profileResult = await this.callZome('create_profile', profile);
        return {
            agentPubKey: profileResult.agentPubKey,
            profile: profileResult.profile,
        };
    }
    /**
     * Update my profile
     *
     * @param profile the profile to create
     * @returns my profile with my agentPubKey
     */
    async updateProfile(profile) {
        const profileResult = await this.callZome('update_profile', profile);
        return {
            agentPubKey: profileResult.agentPubKey,
            profile: profileResult.profile,
        };
    }
    callZome(fn_name, payload) {
        return this.cellClient.callZome(this.zomeName, fn_name, payload);
    }
}
//# sourceMappingURL=profiles-service.js.map