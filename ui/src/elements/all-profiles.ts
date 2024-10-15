import { sharedStyles } from '@holochain-open-dev/elements';
import '@holochain-open-dev/elements/dist/elements/display-error.js';
import { SignalWatcher, joinAsyncMap } from '@holochain-open-dev/signals';
import { EntryRecord, mapValues } from '@holochain-open-dev/utils';
import { ActionHash, AgentPubKey } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { profilesStoreContext } from '../context.js';
import { ProfilesStore } from '../profiles-store.js';
import { Profile } from '../types.js';
import './agent-avatar.js';
import './profile-list-item-skeleton.js';

/**
 * @element all-profiles
 * @fires profile-selected - Fired when the user selects an agent from the list. Detail will have this shape: { profileHash: <ProfileHash as ActionHash> }
 */
@localized()
@customElement('all-profiles')
export class AllProfiles extends SignalWatcher(LitElement) {
	/**
	 * Profiles store for this element, not required if you embed this element inside a <profiles-context>
	 */
	@consume({ context: profilesStoreContext, subscribe: true })
	@property()
	store!: ProfilesStore;

	/** Private properties */

	initials(nickname: string): string {
		return nickname
			.split(' ')
			.map(name => name[0])
			.join('');
	}

	fireAgentSelected(profileHash: ActionHash) {
		if (profileHash) {
			this.dispatchEvent(
				new CustomEvent('profile-selected', {
					bubbles: true,
					composed: true,
					detail: {
						profileHash,
					},
				}),
			);
		}
	}

	renderList(
		profiles: ReadonlyMap<ActionHash, EntryRecord<Profile> | undefined>,
	) {
		if (profiles.size === 0)
			return html`<span>${msg('There are no created profiles yet')} ></span>`;

		return html`
			<div style="min-width: 80px; flex: 1;" }>
				${Array.from(profiles.entries()).map(
					([profileHash, profile]) => html`
						<div
							class="row"
							style="align-items: center; margin-bottom: 16px; gap: 8px"
						>
							<agent-avatar
								.profileHash=${profileHash}
								@click=${() => this.fireAgentSelected(profileHash)}
							>
							</agent-avatar
							><span> ${profile?.entry.nickname}</span>
						</div>
					`,
				)}
			</div>
		`;
	}

	allProfiles() {
		const allProfiles = this.store.allProfiles.get();
		if (allProfiles.status !== 'completed') return allProfiles;

		const latestProfiles = joinAsyncMap(
			mapValues(allProfiles.value, p => p.latestVersion.get()),
		);
		return latestProfiles;
	}

	render() {
		const allProfiles = this.allProfiles();

		switch (allProfiles.status) {
			case 'pending':
				return html`<div class="column center-content">
					<profile-list-item-skeleton> </profile-list-item-skeleton>
					<profile-list-item-skeleton> </profile-list-item-skeleton>
					<profile-list-item-skeleton> </profile-list-item-skeleton>
				</div>`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching the profiles for all agents')}
					.error=${allProfiles.error}
				></display-error>`;
			case 'completed':
				return this.renderList(allProfiles.value);
		}
	}

	static styles = [
		sharedStyles,
		css`
			:host {
				display: flex;
			}
		`,
	];
}
