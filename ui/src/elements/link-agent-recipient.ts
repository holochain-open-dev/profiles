import {
	notify,
	notifyError,
	sharedStyles,
} from '@holochain-open-dev/elements';
import { SignalWatcher } from '@holochain-open-dev/signals';
import { encodeHashToBase64 } from '@holochain/client';
import { consume } from '@lit/context';
import { msg } from '@lit/localize';
import { SlInput } from '@shoelace-style/shoelace';
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { TTL_CAP_GRANT } from '../config.js';
import { profilesStoreContext } from '../context.js';
import { ProfilesStore } from '../profiles-store.js';
import { RequestLinkAgentSignal } from '../types.js';
import './passcode-input.js';
import { PasscodeInput } from './passcode-input.js';

function randomDigit(): number {
	return Math.floor(Math.random() * 10);
}

export function randomPasscode(length: number) {
	const passcode: number[] = [];

	for (let i = 0; i < length; i++) {
		passcode.push(randomDigit());
	}
	return passcode;
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
	recipientPasscode: number[] = [];

	@state()
	requestLinkAgentSignal: RequestLinkAgentSignal | undefined;

	interval: any;

	async firstUpdated() {
		this.recipientPasscode = randomPasscode(
			this.store.config.linkDevicePasscodeLength,
		);
		this.interval = setInterval(async () => {
			this.recipientPasscode = randomPasscode(
				this.store.config.linkDevicePasscodeLength,
			);
			await this.store.client.clearLinkAgent();
			await this.store.client.prepareLinkAgent(this.recipientPasscode);
		}, TTL_CAP_GRANT);
		await this.store.client.prepareLinkAgent(this.recipientPasscode);

		this.store.client.onSignal(signal => {
			if ('type' in signal) return;
			this.requestLinkAgentSignal = signal as RequestLinkAgentSignal;
		});
	}
	disconnectedCallback(): void {
		super.disconnectedCallback();
		clearInterval(this.interval);
		this.store.client.clearLinkAgent();
	}

	async attemptLinkAgent(
		requestLinkAgentSignal: RequestLinkAgentSignal,
		inputtedRequestorPasscode: Array<number>,
	) {
		if (
			!areEqual(
				requestLinkAgentSignal.requestor_passcode,
				inputtedRequestorPasscode,
			)
		) {
			notifyError(msg('Incorrect pass code'));
			(
				this.shadowRoot!.querySelector('passcode-input') as PasscodeInput
			).clearPasscode();
			return;
		}
		try {
			await this.store.client.linkAgentWithMyProfile(
				requestLinkAgentSignal.from,
			);
			this.dispatchEvent(
				new CustomEvent('agent-linked', {
					bubbles: true,
					composed: true,
					detail: {
						agentPubKey: requestLinkAgentSignal.from,
					},
				}),
			);
			notify(msg('Device linked successfully'));
		} catch (e) {
			console.error(e);
			notifyError(msg(`Error`));
		}
		(
			this.shadowRoot!.querySelector('passcode-input') as PasscodeInput
		).clearPasscode();
	}

	renderRequestLinkAgent(requestLinkAgentSignal: RequestLinkAgentSignal) {
		return html`
			<div
				class="column"
				style="gap: 12px; align-items: center; justify-content: center; flex: 1"
			>
				<span class="title">${msg('Device link request received')} </span>
				<span>${msg('Enter the pass code from your other device:')} </span>
				<passcode-input
					.passcodeLength=${this.store.config.linkDevicePasscodeLength}
					@passcode-change=${(e: CustomEvent) =>
						this.attemptLinkAgent(requestLinkAgentSignal, e.detail.passcode)}
				>
				</passcode-input>
			</div>
		`;
	}

	render() {
		if (this.requestLinkAgentSignal)
			return this.renderRequestLinkAgent(this.requestLinkAgentSignal);

		return html`<div
			class="column"
			style="gap: 12px; align-items: center; justify-content: center; flex: 1"
		>
			<span
				>${msg(
					'Enter this pass code in your other device (valid for one minute):',
				)}
			</span>
			<span class="passcode">${this.recipientPasscode.join('')}</span>
		</div>`;
	}

	static styles = [
		sharedStyles,
		css`
			:host {
				display: flex;
				justify-content: center;
			}
			.passcode {
				font-family: Monospace, sans-serif;
				letter-spacing: 0.2rem;
				font-size: 3em;
			}
		`,
	];
}

function areEqual(passcode1: Array<number>, passcode2: Array<number>) {
	if (passcode1.length !== passcode2.length) return false;
	for (let i = 0; i < passcode1.length; i++) {
		if (passcode1[i] !== passcode2[i]) return false;
	}

	return true;
}
