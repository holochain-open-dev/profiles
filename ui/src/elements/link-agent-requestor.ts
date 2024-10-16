import { notifyError, sharedStyles } from '@holochain-open-dev/elements';
import { Signal, SignalWatcher, toPromise } from '@holochain-open-dev/signals';
import { HashType, HoloHashMap, retype } from '@holochain-open-dev/utils';
import {
	ActionHash,
	AgentPubKey,
	AgentPubKeyB64,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import { consume } from '@lit/context';
import { msg } from '@lit/localize';
import { SlInput } from '@shoelace-style/shoelace';
import { LitElement, css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { profilesStoreContext } from '../context.js';
import { ProfilesStore } from '../profiles-store.js';
import { effect } from '../utils.js';
import { randomPasscode } from './link-agent-recipient.js';
import './passcode-input.js';
import { PasscodeInput } from './passcode-input.js';

@customElement('link-agent-requestor')
export class LinkAgentRequestor extends SignalWatcher(LitElement) {
	/**
	 * Profiles store for this element, not required if you embed this element inside a <profiles-context>
	 */
	@consume({ context: profilesStoreContext, subscribe: true })
	@property()
	store!: ProfilesStore;

	// attemptedRecipients = new HoloHashMap<
	// 	AgentPubKey,
	// 	'requesting' | 'unauthorized' | 'error' | 'success'
	// >();

	requestorpasscode!: number[];

	@state()
	successfulRecipient: AgentPubKey | undefined;

	firstUpdated() {
		this.requestorpasscode = randomPasscode(
			this.store.config.linkDevicePasscodeLength,
		);

		setTimeout(() => {
			this.shadowRoot!.getElementById('input-0')?.focus();
		});
	}

	async maybeRequestLink(passcode: number[]) {
		const linkingAgentsLinks = await this.store.client.getLinkingAgents();

		const linkingAgents = linkingAgentsLinks.map(l =>
			retype(l.target, HashType.AGENT),
		);

		for (const linkingAgent of linkingAgents) {
			// if (!this.attemptedRecipients.has(linkingAgent)) {
			// 	this.attemptedRecipients.set(linkingAgent, 'requesting');
			try {
				await this.store.client.requestLinkAgent(
					linkingAgent,
					passcode,
					this.requestorpasscode,
				);
				// this.attemptedRecipients.set(linkingAgent, 'success');
				this.successfulRecipient = linkingAgent;
			} catch (e: any) {
				console.error(e);
				if (e.toString().includes('Unauthorized')) {
					// this.attemptedRecipients.set(linkingAgent, 'unauthorized');
					// notifyError(msg(``));
					// Two possibilities: either its the wrong agent, or the user messed up entering the pass code
				} else {
					notifyError(msg('Error linking devices: please try again'));
					// this.attemptedRecipients.set(linkingAgent, 'error');
					(
						this.shadowRoot!.querySelector('passcode-input') as PasscodeInput
					).clearPasscode();
					// }
				}
			}
		}
		if (!this.successfulRecipient) {
			notifyError(msg('Incorrect pass code'));
			(
				this.shadowRoot!.querySelector('passcode-input') as PasscodeInput
			).clearPasscode();
		}
	}

	renderNumber() {
		return html`<div
			class="column"
			style="gap: 12px; align-items: center; justify-content: center; flex: 1"
		>
			<span>${msg('Enter this pass code in your other device:')} </span>
			<span class="passcode">${this.requestorpasscode.join('')}</span>
		</div>`;
	}

	render() {
		if (this.successfulRecipient) return this.renderNumber();
		return html`
			<div
				class="column"
				style="gap: 12px; align-items: center; justify-content: center; flex: 1"
			>
				<span>${msg('Enter the pass code from your other device:')} </span>
				<passcode-input
					.passcodeLength=${this.store.config.linkDevicePasscodeLength}
					@passcode-change=${(e: CustomEvent) =>
						this.maybeRequestLink(e.detail.passcode)}
				>
				</passcode-input>
			</div>
		`;
	}

	static styles = [
		sharedStyles,
		css`
			.passcode {
				font-family: Monospace, sans-serif;
				letter-spacing: 0.2rem;
				font-size: 3em;
			}
		`,
	];
}
