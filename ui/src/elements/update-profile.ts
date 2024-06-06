import { sharedStyles } from '@holochain-open-dev/elements';
import '@holochain-open-dev/elements/dist/elements/display-error.js';
import { SignalWatcher } from '@holochain-open-dev/signals';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { profilesStoreContext } from '../context.js';
import { ProfilesStore } from '../profiles-store.js';
import { Profile } from '../types.js';
import './edit-profile.js';

/**
 * @element update-profile
 * @fires profile-updated - Fired after the profile has been created. Detail will have this shape: { profile: { nickname, fields } }
 */
@localized()
@customElement('update-profile')
export class UpdateProfile extends SignalWatcher(LitElement) {
	/**
	 * Profiles store for this element, not required if you embed this element inside a <profiles-context>
	 */
	@consume({ context: profilesStoreContext, subscribe: true })
	@property()
	store!: ProfilesStore;

	async updateProfile(profile: Profile) {
		await this.store.client.updateProfile(profile);

		this.dispatchEvent(
			new CustomEvent('profile-updated', {
				detail: {
					profile,
				},
				bubbles: true,
				composed: true,
			}),
		);
	}

	render() {
		const myProfile = this.store.myProfile.get();

		switch (myProfile.status) {
			case 'pending':
				return html`<div
					class="column"
					style="align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem"></sl-spinner>
				</div>`;
			case 'completed':
				return html` <edit-profile
					.allowCancel=${true}
					style="margin-top: 16px; flex: 1"
					.profile=${myProfile.value}
					.saveProfileLabel=${msg('Update Profile')}
					@save-profile=${(e: CustomEvent) =>
						this.updateProfile(e.detail.profile)}
				></edit-profile>`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching your profile')}
					.error=${myProfile.error}
				></display-error>`;
		}
	}

	static get styles() {
		return [
			sharedStyles,
			css`
				:host {
					display: flex;
				}
			`,
		];
	}
}
