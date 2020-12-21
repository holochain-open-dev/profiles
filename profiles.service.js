export class ProfilesService {
    constructor(appWebsocket, cellId, zomeName = 'profiles') {
        this.appWebsocket = appWebsocket;
        this.cellId = cellId;
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
    async createProfile(profile) {
        const profileResult = await this.callZome('create_profile', profile);
        return {
            agent_pub_key: profileResult.agent_pub_key,
            profile: profileResult.profile,
        };
    }
    callZome(fn_name, payload) {
        return this.appWebsocket.callZome({
            cap: null,
            cell_id: this.cellId,
            zome_name: this.zomeName,
            fn_name: fn_name,
            payload: payload,
            provenance: this.cellId[1],
        });
    }
}
//# sourceMappingURL=profiles.service.js.map