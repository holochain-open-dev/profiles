import { Dictionary } from '@holochain-open-dev/common/core-types';
import { ProfilesService } from './profiles.service';
import { AgentProfile, Profile } from './types';
export declare class ProfilesStore {
    protected profilesService: ProfilesService;
    profiles: Dictionary<Profile>;
    constructor(profilesService: ProfilesService);
    profileOf(agentPubKey: string): Profile;
    get myAgentPubKey(): string;
    get myProfile(): Profile | undefined;
    get knownProfiles(): Array<AgentProfile>;
    fetchAllProfiles(): Promise<void>;
    fetchAgentProfile(agentPubKey: string): Promise<void>;
    fetchMyProfile(): Promise<void>;
    searchProfiles(nicknamePrefix: string): Promise<void>;
    createProfile(profile: Profile): Promise<void>;
}
