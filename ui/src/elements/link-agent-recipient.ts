import { notifyError, sharedStyles } from '@holochain-open-dev/elements';
import { SignalWatcher } from '@holochain-open-dev/signals';
import { encodeHashToBase64 } from '@holochain/client';
import { consume } from '@lit/context';
import { msg } from '@lit/localize';
import { SlInput } from '@shoelace-style/shoelace';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { profilesStoreContext } from '../context';
import { ProfilesStore } from '../profiles-store';
import { RequestLinkAgentSignal } from '../types';

function randomDigit(): number {
	return Math.round(Math.random() * 10);
}

export function randomPassnumber(length: number) {
	const passnumber: number[] = [];

	for (let i = 0; i < length; i++) {
		passnumber.push(randomDigit());
	}
	return passnumber;
}

@customElement('link-agent-recipient')
export class LinkAgentRecipient extends SignalWatcher(LitElement) {
	/**
	 * Profiles store for this element, not required if you embed this element inside a <profiles-context>
	 */
	@consume({ context: profilesStoreContext, subscribe: true })
	@property()
	store!: ProfilesStore;

	@state()
	recipientPassnumber: number[] = [];

	@state()
	requestLinkAgentSignal: RequestLinkAgentSignal | undefined;

	inputtedRequestorPassnumber!: Array<number | undefined>;

	async firstUpdated() {
		this.recipientPassnumber = randomPassnumber(
			this.store.config.passnumberLength,
		);
		this.inputtedRequestorPassnumber = Array.from(
			Array(this.store.config.passnumberLength),
		).map(() => undefined);
		await this.store.client.prepareLinkAgent(this.recipientPassnumber);

		this.store.client.onSignal(signal => {
			if ('type' in signal) return;
			this.requestLinkAgentSignal = signal as RequestLinkAgentSignal;
		});
	}
	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.store.client.clearLinkAgent();
	}

	clearPassnumber() {
		const inputs = Array.from(this.shadowRoot!.querySelectorAll('sl-input'));
		inputs.forEach(i => (i.value = ''));
		this.inputtedRequestorPassnumber = Array.from(
			Array(this.store.config.passnumberLength),
		).map(() => undefined);
	}

	async attemptLinkAgent(
		requestLinkAgentSignal: RequestLinkAgentSignal,
		inputtedRequestorPassnumber: Array<number>,
	) {
		if (
			!areEqual(
				requestLinkAgentSignal.requestor_passnumber,
				inputtedRequestorPassnumber,
			)
		) {
			notifyError(msg('Incorrect pass number'));
			this.clearPassnumber();
			return;
		}
		try {
			await this.store.client.linkAgentWithMyProfile(
				requestLinkAgentSignal.from,
			);
		} catch (e) {
			console.error(e);
			notifyError(msg(`Error`));
		}
		this.clearPassnumber();
	}

	renderRequestLinkAgent(requestLinkAgentSignal: RequestLinkAgentSignal) {
		return html`
			<div class="column">
				<div class="row">
					${Array.from(Array(this.store.config.passnumberLength)).map(
						(_, i) =>
							html`<sl-input
								id="input-${i}"
								type="number"
								min="0"
								max="9"
								@sl-input=${(e: CustomEvent) => {
									const input = e.target as SlInput;
									this.inputtedRequestorPassnumber[i] = parseInt(
										input.value,
										10,
									);
									const nextInput = this.shadowRoot!.getElementById(
										`input-${i + 1}`,
									);
									if (nextInput) nextInput.focus();
									if (
										this.inputtedRequestorPassnumber.every(n => n !== undefined)
									)
										this.attemptLinkAgent(
											requestLinkAgentSignal,
											this.inputtedRequestorPassnumber as number[],
										);
								}}
							></sl-input>`,
					)}
				</div>
			</div>
		`;
	}

	render() {
		if (this.requestLinkAgentSignal)
			return this.renderRequestLinkAgent(this.requestLinkAgentSignal);

		return html`<div class="column">
			<span>${this.recipientPassnumber.join('')}</span>
		</div>`;
	}

	static styles = [sharedStyles];
}

function areEqual(passnumber1: Array<number>, passnumber2: Array<number>) {
	if (passnumber1.length !== passnumber2.length) return false;
	for (let i = 0; i < passnumber1.length; i++) {
		if (passnumber1[i] !== passnumber2[i]) return false;
	}

	return true;
}
