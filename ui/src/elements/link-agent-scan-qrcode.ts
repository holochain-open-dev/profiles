import { sharedStyles } from '@holochain-open-dev/elements';
import { SignalWatcher } from '@holochain-open-dev/signals';
import { decodeHashFromBase64, encodeHashToBase64 } from '@holochain/client';
import { consume } from '@lit/context';
import { BrowserQRCodeReader } from '@zxing/browser';
import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { profilesStoreContext } from '../context.js';
import { ProfilesStore } from '../profiles-store.js';

@customElement('link-agent-scan-qrcode')
export class LinkAgentScanQrcode extends SignalWatcher(LitElement) {
	/**
	 * Profiles store for this element, not required if you embed this element inside a <profiles-context>
	 */
	@consume({ context: profilesStoreContext, subscribe: true })
	@property()
	store!: ProfilesStore;

	@query('video')
	video!: HTMLVideoElement;

	async firstUpdated() {
		const codeReader = new BrowserQRCodeReader();

		const videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices();
		const selectedDeviceId = videoInputDevices[0].deviceId;

		await codeReader.decodeFromVideoDevice(
			selectedDeviceId,
			this.video,
			decodeResult => {
				if (!decodeResult) return;
				const text = decodeResult.getText();

				if (text.length !== 40) return;

				const recipientAgentPubKey = decodeHashFromBase64(text);
				console.log(recipientAgentPubKey);
			},
		);
	}

	render() {
		return html`
			<video width="300" height="200" style="border: 1px solid gray"></video>
		`;
	}

	static styles = [sharedStyles];
}
