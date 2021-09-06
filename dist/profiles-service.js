export class ProfilesService {
    constructor(cellClient, zomeName = 'profiles') {
        this.cellClient = cellClient;
        this.zomeName = zomeName;
    }
    async getMyProfile() {
        return this.callZome('get_my_profile', null);
    }
    async getAgentProfile(agentPubKey) {
        return this.callZome('get_agent_profile', agentPubKey);
    }
    async searchProfiles(nicknamePrefix) {
        return this.callZome('search_profiles', {
            nickname_prefix: nicknamePrefix,
        });
    }
    async getAllProfiles() {
        return this.callZome('get_all_profiles', null);
    }
    async createProfile(profile) {
        const profileResult = await this.callZome('create_profile', profile);
        return {
            agent_pub_key: profileResult.agent_pub_key,
            profile: profileResult.profile,
        };
    }
    callZome(fn_name, payload) {
        return this.cellClient.callZome(this.zomeName, fn_name, payload);
    }
}
//# sourceMappingURL=profiles-service.js.map