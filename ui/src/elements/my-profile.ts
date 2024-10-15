import { sharedStyles, wrapPathInSvg } from '@holochain-open-dev/elements';
import { SignalWatcher } from '@holochain-open-dev/signals';
import { consume } from '@lit/context';
import { mdiPencil } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { profilesStoreContext } from '../context.js';
import { ProfilesStore } from '../profiles-store.js';
import './profile-detail.js';
import './update-profile.js';

/**
 * @element my-profile
 */
@customElement('my-profile')
export class MyProfile extends SignalWatcher(LitElement) {
	/**
	 * Profiles store for this element, not required if you embed this element inside a <profiles-context>
	 */
	@consume({ context: profilesStoreContext, subscribe: true })
	@property()
	store!: ProfilesStore;

	/** Private properties */

	/**
	 * @internal
	 */
	@state()
	private _editing = false;

	render() {
		if (this._editing)
			return html`<update-profile
				@profile-updated=${() => (this._editing = false)}
				@cancel-edit-profile=${() => (this._editing = false)}
			></update-profile>`;

		return html`
			<profile-detail .agentPubKey=${this.store.client.client.myPubKey}>
				<sl-icon-button
					src="${wrapPathInSvg(mdiPencil)}"
					slot="action"
					@click=${() => (this._editing = true)}
				></sl-icon-button>
			</profile-detail>
		`;
	}

	static styles = [sharedStyles];
}
