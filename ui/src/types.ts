import { ActionCommittedSignal } from '@holochain-open-dev/utils';
import { ActionHash } from '@holochain/client';

export type ProfilesSignal = ActionCommittedSignal<EntryTypes, any>;

export type EntryTypes =
	| ({ type: 'Profile' } & Profile)
	| ({ type: 'ProfileClaim' } & ProfileClaim);

export interface Profile {
	nickname: string;
	fields: Record<string, string>;
}

export interface ProfileClaim {
	profile_hash: ActionHash;
	agent_to_profile_create_link_hash: ActionHash;
}
