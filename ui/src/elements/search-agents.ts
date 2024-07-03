import {
	FormField,
	FormFieldController,
	hashProperty,
	sharedStyles,
	wrapPathInSvg,
} from '@holochain-open-dev/elements';
import { SignalWatcher } from '@holochain-open-dev/signals';
import { AgentPubKey } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiDelete } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { profilesStoreContext } from '../context.js';
import { ProfilesStore } from '../profiles-store.js';
import './profile-list-item.js';
import './search-agent.js';

/**
 * @element search-agents
 */
@localized()
@customElement('search-agents')
export class SearchAgents
	extends SignalWatcher(LitElement)
	implements FormField
{
	/** Form field properties */

	/**
	 * The name of the field if this element is used inside a form
	 * Required only if the element is used inside a form
	 */
	@property()
	name!: string;

	/**
	 * The default value of the field if this element is used inside a form
	 */
	@property(hashProperty('default-value'))
	defaultValue: Array<AgentPubKey> = [];

	/**
	 * Whether this field is required if this element is used inside a form
	 */
	@property()
	required = false;

	/**
	 * Whether this field is disabled if this element is used inside a form
	 */
	@property()
	disabled = false;

	/**
	 * Label for the agent searching field.
	 * @attr field-label
	 */
	@property({ type: String, attribute: 'field-label' })
	fieldLabel!: string;

	/**
	 * Placeholder to show when the list is empty.
	 * @attr empty-list-placeholder
	 */
	@property({ type: String, attribute: 'empty-list-placeholder' })
	emptyListPlaceholder = msg('No agents selected yet.');

	/**
	 * @internal
	 */
	_controller = new FormFieldController(this);

	/**
	 * Profiles store for this element, not required if you embed this element inside a <profiles-context>
	 */
	@consume({ context: profilesStoreContext, subscribe: true })
	@property()
	store!: ProfilesStore;

	/**
	 * Agents that won't be listed in the search
	 */
	@property()
	excludedAgents: AgentPubKey[] = [];

	reportValidity() {
		return true;
	}

	async reset() {
		this.value = this.defaultValue;
	}

	/**
	 * @internal
	 */
	@state()
	value: AgentPubKey[] = [];

	render() {
		return html`
			<div class="column" style="gap: 16px">
				<search-agent
					.fieldLabel=${this.fieldLabel}
					clear-on-select
					@agent-selected=${(e: any) => {
						this.value = [...this.value, e.detail.agentPubKey];
						this.dispatchEvent(
							new CustomEvent('agents-changed', {
								composed: true,
								bubbles: true,
								detail: {
									agents: this.value,
								},
							}),
						);
					}}
					.excludedAgents=${this.excludedAgents}
				></search-agent>
				${this.value.length === 0
					? html`<span class="placeholder">${this.emptyListPlaceholder}</span>`
					: this.value.map(
							(agent, i) =>
								html`<div class="row">
									<profile-list-item
										style="flex: 1"
										.agentPubKey=${agent}
									></profile-list-item
									><sl-icon-button
										.src=${wrapPathInSvg(mdiDelete)}
										@click=${() => {
											this.value = this.value.filter((v, i2) => i2 !== i);
											this.dispatchEvent(
												new CustomEvent('agents-changed', {
													composed: true,
													bubbles: true,
													detail: {
														agents: this.value,
													},
												}),
											);
										}}
									></sl-icon-button>
								</div>`,
						)}
			</div>
		`;
	}

	static styles = [sharedStyles];
}
