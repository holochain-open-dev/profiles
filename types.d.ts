import type { HolochainAgent } from '@holochain-open-dev/common';
export interface HolochainAgentWithProfile extends HolochainAgent {
    profile: Profile;
}
export interface Profile {
    username: string;
    avatar: string;
}
