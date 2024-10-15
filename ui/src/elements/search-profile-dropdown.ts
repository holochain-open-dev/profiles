import { sharedStyles } from '@holochain-open-dev/elements';
import '@holochain-open-dev/elements/dist/elements/display-error.js';
import {
	AsyncComputed,
	Signal,
	SignalWatcher,
	joinAsyncMap,
	pipe,
	toPromise,
} from '@holochain-open-dev/signals';
import {
	EntryRecord,
	HoloHashMap,
	mapValues,
	slice,
} from '@holochain-open-dev/utils';
import {
	ActionHash,
	AgentPubKey,
	decodeHashFromBase64,
	encodeHashToBase64,
} from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import SlDropdown from '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { profilesStoreContext } from '../context.js';
import { ProfilesStore } from '../profiles-store.js';
import { Profile } from '../types.js';
import './agent-avatar.js';
import './profile-list-item-skeleton.js';

/**
 * @element search-profile-dropdown
 * @fires profile-selected - Fired when the user selects some agent. Detail will have this shape: { profileHash: ActionHash }
 */
@localized()
@customElement('search-profile-dropdown')
export class SearchProfileDropdown extends SignalWatcher(LitElement) {
	/** Public attributes */

	set searchFilter(sf: string | undefined) {
		this._searchFilter.set(sf);
	}
	get searchFilter() {
		return this._searchFilter.get();
	}

	_searchFilter = new Signal.State<string | undefined>(undefined);

	@property()
	open: boolean | undefined;

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
	 * @internal
	 */
	_searchProfiles = pipe(
		this._searchFilter,
		filter => this.store.client.searchProfiles(filter!),
		profilesHashes => {
			const profiles = slice(this.store.profiles, profilesHashes);
			return joinAsyncMap(mapValues(profiles, p => p.latestVersion.get()));
		},
	);

	/**
	 * @internal
	 */
	@query('#dropdown')
	public dropdown!: SlDropdown;

	async onProfileSelected(
		profileHash: ActionHash,
		profile: EntryRecord<Profile>,
	) {
		this.dispatchEvent(
			new CustomEvent('profile-selected', {
				detail: {
					profileHash,
					profile,
				},
				bubbles: true,
				composed: true,
			}),
		);
	}

	renderProfileList() {
		const sf = this._searchFilter.get();
		if (!sf || sf.length < 3)
			return html`<sl-menu-item disabled
				>${msg('Enter at least 3 chars to search...')}</sl-menu-item
			>`;

		const searchResult = this._searchProfiles.get();

		switch (searchResult.status) {
			case 'pending':
				return Array(3).map(
					() => html`
						<sl-menu-item>
							<sl-skeleton
								effect="sheen"
								slot="prefix"
								style="height: 32px; width: 32px; border-radius: 50%; margin: 8px"
							></sl-skeleton>
							<sl-skeleton
								effect="sheen"
								style="width: 100px; margin: 8px; border-radius: 12px"
							></sl-skeleton>
						</sl-menu-item>
					`,
				);
			case 'error':
				return html`
					<display-error
						style="flex: 1; display:flex"
						tooltip
						.headline=${msg('Error searching profiles')}
						.error=${searchResult.error}
					></display-error>
				`;
			case 'completed': {
				let profiles = Array.from(searchResult.value.entries());
				let excludedStr = this.excludedProfiles.map(a => a.toString());

				profiles = profiles.filter(
					([profileHash, _profile]) =>
						!excludedStr.includes(profileHash.toString()),
				);

				if (profiles.length === 0)
					return html`<sl-menu-item disabled>
						${msg('No nicknames match the filter')}
					</sl-menu-item>`;

				return html`
					${profiles.map(
						([profileHash, profile]) => html`
							<sl-menu-item .value=${encodeHashToBase64(profileHash)}>
								<agent-avatar
									slot="prefix"
									.profileHash=${profileHash}
									style="margin-right: 16px"
								></agent-avatar>
								${profile?.entry.nickname}
							</sl-menu-item>
						`,
					)}
				`;
			}
		}
	}

	render() {
		return html`
			<sl-dropdown id="dropdown" style="flex: 1" .open=${ifDefined(this.open)}>
				<slot slot="trigger"></slot>
				<sl-menu
					@sl-select=${async (e: CustomEvent) => {
						const profileHash = decodeHashFromBase64(e.detail.item.value);
						const profile = await toPromise(
							this.store.profiles.get(profileHash).latestVersion,
						);
						this.onProfileSelected(profileHash, profile);
					}}
				>
					${this.renderProfileList()}
				</sl-menu>
			</sl-dropdown>
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
