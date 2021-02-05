import { __decorate } from "tslib";
import { serializeHash } from '@holochain-open-dev/common';
import { observable, makeObservable, action, runInAction, computed, } from 'mobx';
export class ProfilesStore {
    constructor(profilesService) {
        this.profilesService = profilesService;
        this.profiles = {};
        makeObservable(this);
    }
    get myAgentPubKey() {
        return serializeHash(this.profilesService.cellId[1]);
    }
    get myProfile() {
        return this.profiles[this.myAgentPubKey];
    }
    get knownProfiles() {
        return Object.entries(this.profiles).map(([agent_pub_key, profile]) => ({
            agent_pub_key,
            profile,
        }));
    }
    async fetchAllProfiles() {
        const allProfiles = await this.profilesService.getAllProfiles();
        runInAction(() => {
            for (const agentProfile of allProfiles) {
                this.profiles[agentProfile.agent_pub_key] = agentProfile.profile;
            }
        });
    }
    async fetchMyProfile() {
        const myProfile = await this.profilesService.getMyProfile();
        runInAction(() => {
            this.profiles[this.myAgentPubKey] = myProfile.profile;
        });
    }
    async searchProfiles(nicknamePrefix) {
        const searchedProfiles = await this.profilesService.searchProfiles(nicknamePrefix);
        runInAction(() => {
            for (const { agent_pub_key, profile } of searchedProfiles) {
                this.profiles[agent_pub_key] = profile;
            }
        });
    }
    async createProfile(profile) {
        await this.profilesService.createProfile(profile);
        runInAction(() => {
            this.profiles[this.myAgentPubKey] = profile;
        });
    }
}
__decorate([
    observable
], ProfilesStore.prototype, "profiles", void 0);
__decorate([
    computed
], ProfilesStore.prototype, "myProfile", null);
__decorate([
    computed
], ProfilesStore.prototype, "knownProfiles", null);
__decorate([
    action
], ProfilesStore.prototype, "fetchAllProfiles", null);
__decorate([
    action
], ProfilesStore.prototype, "fetchMyProfile", null);
__decorate([
    action
], ProfilesStore.prototype, "searchProfiles", null);
__decorate([
    action
], ProfilesStore.prototype, "createProfile", null);
//# sourceMappingURL=profiles.store.js.map