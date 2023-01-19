import { property, state, query } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import {
  MenuSurface,
  List,
  ListItem,
  TextField,
  CircularProgress,
} from "@scoped-elements/material-web";
import { consume } from "@lit-labs/context";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { msg } from "@lit/localize";

import { Profile } from "../types";
import { sharedStyles } from "./utils/shared-styles";
import { ProfilesStore } from "../profiles-store";
import { profilesStoreContext } from "../context";
import { AgentAvatar } from "./agent-avatar";
import { StoreSubscriber } from "lit-svelte-stores";
import { AgentPubKey } from "@holochain/client";

/**
 * @element search-agent
 * @fires agent-selected - Fired when the user selects some agent. Detail will have this shape: { agentPubKey: Uint8Array }
 */
export class SearchAgent extends ScopedElementsMixin(LitElement) {
  /** Public attributes */

  /**
   * Whether to clear the field when an agent is selected.
   * @attr clear-on-select
   */
  @property({ type: Boolean, attribute: "clear-on-select" })
  clearOnSelect = false;

  /**
   * Whether to include my own agent as a possible agent to select.
   * @attr include-myself
   */
  @property({ type: Boolean, attribute: "include-myself" })
  includeMyself = false;

  /**
   * Label for the agent searching field.
   * @attr field-label
   */
  @property({ type: String, attribute: "field-label" })
  fieldLabel: string | undefined;

  /** Dependencies */

  /**
   * `ProfilesStore` that is requested via context.
   * Only set this property if you want to override the store requested via context.
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property({ type: Object })
  store!: ProfilesStore;

  @state()
  private _currentFilter: string | undefined = undefined;

  searchProfiles = new StoreSubscriber(this, () =>
    this._currentFilter
      ? this.store.searchProfiles(this._currentFilter)
      : undefined
  );

  @query("#textfield")
  private _textField!: TextField;
  @query("#overlay")
  private _overlay!: MenuSurface;

  firstUpdated() {
    this.addEventListener("blur", () => this._overlay.close());
  }

  onFilterChange() {
    if (this._textField.value.length < 3) return;

    this._overlay.show();

    this._currentFilter = this._textField.value;
  }

  onUsernameSelected([agentPubKey, profile]: [AgentPubKey, Profile]) {
    this.dispatchEvent(
      new CustomEvent("agent-selected", {
        detail: {
          agentPubKey,
        },
      })
    );

    // If the consumer says so, clear the field
    if (this.clearOnSelect) {
      this._textField.value = "";
      this._currentFilter = undefined;
    } else {
      this._textField.value = profile.nickname;
    }
    this._overlay.close();
  }

  renderAgentList() {
    if (this.searchProfiles.value === undefined) return html``;

    switch (this.searchProfiles.value.status) {
      case "pending":
        return html`<mwc-circular-progress
          indeterminate
        ></mwc-circular-progress>`;
      case "error":
        return html`<span
          >${msg("There was an error while fetching the agents:")}
          ${this.searchProfiles.value.error}</span
        >`;
      case "complete": {
        const agents = this.searchProfiles.value.value;
        if (agents.keys().length === 0)
          return html`<mwc-list-item
            >${msg("No agents match the filter")}</mwc-list-item
          >`;

        return html`
          <mwc-list
            style="min-width: 80px;"
            @selected=${(e: CustomEvent) =>
              this.onUsernameSelected(agents.entries()[e.detail.index])}
          >
            ${agents.entries().map(
              ([pubkey, profile]) => html` <mwc-list-item
                graphic="avatar"
                style="--mdc-list-item-graphic-size: 32px;"
              >
                <agent-avatar
                  slot="graphic"
                  .agentPubKey=${pubkey}
                ></agent-avatar>
                <span style="margin-left: 8px;">${profile.nickname}</span>
              </mwc-list-item>`
            )}
          </mwc-list>
        `;
      }
    }
  }

  render() {
    return html`
      <div style="position: relative; flex: 1; display: flex;">
        <mwc-textfield
          id="textfield"
          style="flex: 1;"
          class="input"
          .label=${this.fieldLabel ?? msg("Search agent")}
          .placeholder=${msg("At least 3 chars...")}
          outlined
          @input=${() => this.onFilterChange()}
          @focus=${() => this._currentFilter && this._overlay.show()}
        >
        </mwc-textfield>
        <mwc-menu-surface id="overlay" absolute x="4" y="28"
          >${this.renderAgentList()}</mwc-menu-surface
        >
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
        #list {
          margin-top: 16px;
          margin-left: 16px;
        }
      `,
    ];
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      "agent-avatar": AgentAvatar,
      "mwc-textfield": TextField,
      "mwc-menu-surface": MenuSurface,
      "mwc-list": List,
      "mwc-circular-progress": CircularProgress,
      "mwc-list-item": ListItem,
    };
  }
}
