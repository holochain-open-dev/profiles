import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { css, html, LitElement } from "lit";
import { consume } from "@lit/context";
import { localized, msg } from "@lit/localize";
import {
  AgentPubKey,
  decodeHashFromBase64,
  encodeHashToBase64,
} from "@holochain/client";
import {
  AsyncComputed,
  fromPromise,
  Signal,
  SignalWatcher,
  toPromise,
  joinAsyncMap,
} from "@holochain-open-dev/signals";
import { sharedStyles } from "@holochain-open-dev/elements";
import { EntryRecord, HoloHashMap, slice } from "@holochain-open-dev/utils";

import "@holochain-open-dev/elements/dist/elements/display-error.js";
import "@shoelace-style/shoelace/dist/components/skeleton/skeleton.js";
import "@shoelace-style/shoelace/dist/components/menu/menu.js";
import "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js";
import SlDropdown from "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";

import "./agent-avatar.js";
import "./profile-list-item-skeleton.js";

import { ProfilesStore } from "../profiles-store.js";
import { profilesStoreContext } from "../context.js";
import { Profile } from "../types.js";

/**
 * @element search-agent-dropdown
 * @fires agent-selected - Fired when the user selects some agent. Detail will have this shape: { agentPubKey: HoloHash }
 */
@localized()
@customElement("search-agent-dropdown")
export class SearchAgentDropdown extends SignalWatcher(LitElement) {
  /** Public attributes */

  set searchFilter(sf: string | undefined) {
    this.searchFilter$.set(sf);
  }
  get searchFilter() {
    return this.searchFilter$.get();
  }

  searchFilter$ = new Signal.State<string | undefined>(undefined);

  @property()
  open: boolean | undefined;

  /**
   * Whether to include my own agent as a possible agent to select.
   * @attr include-myself
   */
  @property({ type: Boolean, attribute: "include-myself" })
  includeMyself = false;

  /**
   * Profiles store for this element, not required if you embed this element inside a <profiles-context>
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property()
  store!: ProfilesStore;

  /**
   * @internal
   */
  _searchProfiles$ = new AsyncComputed(() => {
    const filter = this.searchFilter$.get();
    if (!filter || filter.length < 3)
      return {
        status: "completed",
        value: new HoloHashMap() as ReadonlyMap<
          AgentPubKey,
          EntryRecord<Profile> | undefined
        >,
      };

    const agents = fromPromise(() =>
      this.store.client.searchAgents(filter)
    ).get();
    if (agents.status !== "completed") return agents;

    const profiles = slice(this.store.profiles, agents.value);
    return joinAsyncMap(profiles).get();
  });

  /**
   * @internal
   */
  @query("#dropdown")
  public dropdown!: SlDropdown;

  async onUsernameSelected(agentPubKey: AgentPubKey) {
    const profile = await toPromise(this.store.profiles.get(agentPubKey));
    this.dispatchEvent(
      new CustomEvent("agent-selected", {
        detail: {
          agentPubKey,
          profile,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  renderAgentList() {
    if (!this.searchFilter || this.searchFilter.length < 3)
      return html`<sl-menu-item disabled
        >${msg("Enter at least 3 chars to search...")}</sl-menu-item
      >`;

    const searchResult = this._searchProfiles$.get();

    switch (searchResult.status) {
      case "pending":
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
          `
        );
      case "error":
        return html`
          <display-error
            style="flex: 1; display:flex"
            tooltip
            .headline=${msg("Error searching agents")}
            .error=${searchResult.error}
          ></display-error>
        `;
      case "completed": {
        let agents = Array.from(searchResult.value.entries());

        if (!this.includeMyself) {
          agents = agents.filter(
            ([pubkey, _profile]) =>
              pubkey.toString() !== this.store.client.client.myPubKey.toString()
          );
        }

        if (agents.length === 0)
          return html`<sl-menu-item disabled>
            ${msg("No agents match the filter")}
          </sl-menu-item>`;

        return html`
          ${agents.map(
            ([pubkey, profile]) => html`
              <sl-menu-item .value=${encodeHashToBase64(pubkey)}>
                <agent-avatar
                  slot="prefix"
                  .agentPubKey=${pubkey}
                  style="margin-right: 16px"
                ></agent-avatar>
                ${profile?.entry.nickname}
              </sl-menu-item>
            `
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
          @sl-select=${(e: CustomEvent) => {
            this.onUsernameSelected(decodeHashFromBase64(e.detail.item.value));
          }}
        >
          ${this.renderAgentList()}
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
