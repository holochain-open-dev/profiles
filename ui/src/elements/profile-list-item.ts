import { hashProperty, sharedStyles } from '@holochain-open-dev/elements';
import { AsyncResult, SignalWatcher } from '@holochain-open-dev/signals';
import { EntryRecord } from '@holochain-open-dev/utils';
import { ActionHash, AgentPubKey } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { profilesStoreContext } from '../context.js';
import { ProfilesStore } from '../profiles-store.js';
import { Profile } from '../types.js';
import './agent-avatar.js';
import './profile-list-item-skeleton.js';

/**
 * @element profile-list-item
 */
@localized()
@customElement('profile-list-item')
export class ProfileListItem extends SignalWatcher(LitElement) {
	/**
	 * The public key of the agent to render the profile for
	 */
	@property(hashProperty('agent-pub-key'))
	agentPubKey: AgentPubKey | undefined;

	/**
	 * The public key of the agent to render the profile for
	 */
	@property(hashProperty('profile-hash'))
	profileHash: ActionHash | undefined;

	/**
	 * Profiles store for this element, not required if you embed this element inside a <profiles-context>
	 */
	@consume({ context: profilesStoreContext, subscribe: true })
	@property()
	store!: ProfilesStore;

	profile(): AsyncResult<EntryRecord<Profile> | undefined> {
		if (this.profileHash) {
			return this.store.profiles.get(this.profileHash).latestVersion.get();
		} else if (this.agentPubKey) {
			const agentProfile = this.store.agentProfile.get(this.agentPubKey).get();
			if (agentProfile.status !== 'completed') return agentProfile;
			if (agentProfile.value === undefined) {
				return {
					status: 'completed',
					value: undefined,
				};
			}
			return agentProfile.value.latestVersion.get();
		} else {
			throw new Error(
				'Either agentPubKey or profileHash needs to be defined for the agent-avatar element',
			);
		}
	}

	render() {
		const profile = this.profile();
		switch (profile.status) {
			case 'pending':
				return html`<profile-list-item-skeleton></profile-list-item-skeleton>`;
			case 'completed':
				return html`
					<div class="row" style="align-items: center; gap: 8px">
						<agent-avatar
							.profileHash=${this.profileHash}
							.agentPubKey=${this.agentPubKey}
						></agent-avatar>
						<span>${profile.value?.entry.nickname}</span>
					</div>
				`;
			case 'error':
				return html`<display-error
					tooltip
					.headline=${msg('Error fetching the profile')}
					.error=${profile.error}
				></display-error>`;
		}
	}

	static styles = [sharedStyles];
}
