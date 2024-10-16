import { sharedStyles } from '@holochain-open-dev/elements';
import { Signal, SignalWatcher } from '@holochain-open-dev/signals';
import { HashType, HoloHashMap, retype } from '@holochain-open-dev/utils';
import {
	ActionHash,
	AgentPubKey,
	AgentPubKeyB64,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import { consume } from '@lit/context';
import { SlInput } from '@shoelace-style/shoelace';
import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { profilesStoreContext } from '../context.js';
import { ProfilesStore } from '../profiles-store.js';
import { effect } from '../utils.js';
import { randomPassnumber } from './link-agent-recipient.js';

@customElement('link-agent-requestor')
export class LinkAgentRequestor extends SignalWatcher(LitElement) {
	/**
	 * Profiles store for this element, not required if you embed this element inside a <profiles-context>
	 */
	@consume({ context: profilesStoreContext, subscribe: true })
	@property()
	store!: ProfilesStore;

	attemptedRecipients = new HoloHashMap<
		AgentPubKey,
		'requesting' | 'unauthorized' | 'error' | 'success'
	>();

	recipientPassnumber!: Signal.State<Array<number | undefined>>;
	requestorPassnumber!: number[];

	@state()
	successfulRecipient: AgentPubKey | undefined;

	firstUpdated() {
		this.recipientPassnumber = new Signal.State(
			Array.from(Array(this.store.config.passnumberLength)).map(
				() => undefined,
			) as Array<number | undefined>,
		);
		this.requestorPassnumber = randomPassnumber(
			this.store.config.passnumberLength,
		);
		effect(() => {
			const linkingAgentsLinks = this.store.linkingAgents.get();
			const passnumber = this.recipientPassnumber.get();
			if (
				linkingAgentsLinks.status !== 'completed' ||
				!!passnumber.find(n => n === undefined)
			)
				return;

			const linkingAgents = linkingAgentsLinks.value.map(l =>
				retype(l.target, HashType.AGENT),
			);

			for (const linkingAgent of linkingAgents) {
				if (!this.attemptedRecipients.has(linkingAgent)) {
					this.attemptedRecipients.set(linkingAgent, 'requesting');
					this.store.client
						.requestLinkAgent(
							linkingAgent,
							passnumber as number[],
							this.requestorPassnumber,
						)
						.then(() => {
							this.attemptedRecipients.set(linkingAgent, 'success');
							this.successfulRecipient = linkingAgent;
						})
						.catch(e => {
							if (e.toString().includes('Unauthorized')) {
								this.attemptedRecipients.set(linkingAgent, 'unauthorized');
							} else {
								this.attemptedRecipients.set(linkingAgent, 'error');
							}
						});
				}
			}
		});
	}

	renderNumber() {
		return html`<div class="column">
			<span>${this.requestorPassnumber.join('')}</span>
		</div>`;
	}

	render() {
		if (this.successfulRecipient) return this.renderNumber();
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
									const passnumber = this.recipientPassnumber.get();
									passnumber[i] = parseInt(input.value, 10);
									this.recipientPassnumber.set(passnumber);
									const nextInput = this.shadowRoot!.getElementById(
										`input-${i + 1}`,
									);
									if (nextInput) nextInput.focus();
								}}
							></sl-input>`,
					)}
				</div>
			</div>
		`;
	}

	static styles = [sharedStyles];
}
