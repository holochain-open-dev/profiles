import { ActionCommittedSignal } from '@holochain-open-dev/utils';
import { ActionHash, AgentPubKey } from '@holochain/client';

export interface RequestLinkAgentSignal {
	from: AgentPubKey;
	requestor_passcode: Array<number>;
}

export type ProfilesSignal =
	| ActionCommittedSignal<EntryTypes, any>
	| RequestLinkAgentSignal;

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
