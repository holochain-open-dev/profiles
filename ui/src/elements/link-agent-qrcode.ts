import { sharedStyles } from '@holochain-open-dev/elements';
import { SignalWatcher } from '@holochain-open-dev/signals';
import { encodeHashToBase64 } from '@holochain/client';
import { consume } from '@lit/context';
import '@shoelace-style/shoelace/dist/components/qr-code/qr-code.js';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { profilesStoreContext } from '../context';
import { ProfilesStore } from '../profiles-store';

@customElement('link-agent-qrcode')
export class LinkAgentQrcode extends SignalWatcher(LitElement) {
	/**
	 * Profiles store for this element, not required if you embed this element inside a <profiles-context>
	 */
	@consume({ context: profilesStoreContext, subscribe: true })
	@property()
	store!: ProfilesStore;

	firstUpdated() {
		this.store.client.createLinkAgentCapGrant();
	}
	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.store.client.clearAllLinkAgentsCapGrants();
	}

	render() {
		return html`<sl-qr-code
			.value=${encodeHashToBase64(this.store.client.client.myPubKey)}
		></sl-qr-code>`;
	}

	static styles = [sharedStyles];
}
