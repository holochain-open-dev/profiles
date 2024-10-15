import {
	FormField,
	FormFieldController,
	hashProperty,
	sharedStyles,
} from '@holochain-open-dev/elements';
import '@holochain-open-dev/elements/dist/elements/display-error.js';
import { SignalWatcher, toPromise } from '@holochain-open-dev/signals';
import { EntryRecord } from '@holochain-open-dev/utils';
import { ActionHash, AgentPubKey } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import { LitElement, css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { profilesStoreContext } from '../context.js';
import { ProfilesStore } from '../profiles-store.js';
import { Profile } from '../types.js';
import './profile-list-item-skeleton.js';
import './search-profile-dropdown.js';

/**
 * @element search-profile
 * @fires profile-selected - Fired when the user selects some agent. Detail will have this shape: { agentPubKey: HoloHash }
 */
@localized()
@customElement('search-profile')
export class SearchProfile
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
	defaultValue: ActionHash | undefined;

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
	 * @internal
	 */
	@state()
	value!: ActionHash | undefined;

	/** Public attributes */

	/**
	 * Whether to clear the field when an agent is selected.
	 * @attr clear-on-select
	 */
	@property({ type: Boolean, attribute: 'clear-on-select' })
	clearOnSelect = false;

	/**
	 * Profiles store for this element, not required if you embed this element inside a <profiles-context>
	 */
	@consume({ context: profilesStoreContext, subscribe: true })
	@property()
	store!: ProfilesStore;

	/**
	 * Profiles that won't be listed in the search
	 */
	@property()
	excludedProfiles: ActionHash[] = [];

	/**
	 * Label for the agent searching field.
	 * @attr field-label
	 */
	@property({ type: String, attribute: 'field-label' })
	fieldLabel!: string;

	/**
	 * @internal
	 */
	_controller = new FormFieldController(this);

	reportValidity() {
		const invalid = this.required !== false && this.value === undefined;

		if (invalid) {
			this._textField.setCustomValidity(`This field is required`);
			this._textField.reportValidity();
		}

		return !invalid;
	}

	async reset() {
		this.value = this.defaultValue;
		if (this.defaultValue) {
			const profile = await toPromise(
				this.store.profiles.get(this.defaultValue).latestVersion,
			);
			this._textField.value = profile?.entry.nickname || '';
		} else {
			this._textField.value = '';
		}
	}

	/**
	 * @internal
	 */
	@query('#textfield')
	private _textField!: SlInput;

	@state()
	searchFilter = '';

	onProfileSelected(profileHash: ActionHash, profile: EntryRecord<Profile>) {
		this.value = profileHash;

		// If the consumer says so, clear the field
		if (this.clearOnSelect) {
			this._textField.value = '';
		} else {
			this._textField.value = profile.entry.nickname;
		}
		this.searchFilter = '';
	}

	/**
	 * @internal
	 */
	get _label() {
		let l = this.fieldLabel ? this.fieldLabel : msg('Search Profile');

		if (this.required !== false) l = `${l} *`;

		return l;
	}

	render() {
		return html`
			<div style="flex: 1; display: flex;">
				<search-profile-dropdown
					id="dropdown"
					.open=${this.searchFilter.length >= 3}
					style="flex: 1"
					.excludedProfiles=${this.excludedProfiles}
					.searchFilter=${this.searchFilter}
					@profile-selected=${(e: CustomEvent) =>
						this.onProfileSelected(e.detail.profileHash, e.detail.profile)}
				>
					<sl-input
						id="textfield"
						.label=${this._label}
						.placeholder=${msg('At least 3 chars...')}
						@input=${(e: CustomEvent) => {
							this.searchFilter = (e.target as SlInput).value;
						}}
					></sl-input>
				</search-profile-dropdown>
			</div>
		`;
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
