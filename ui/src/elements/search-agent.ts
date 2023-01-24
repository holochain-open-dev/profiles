import { property, state, query } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import {
  MenuSurface,
  List,
  ListItem,
  TextField,
} from "@scoped-elements/material-web";
import { consume } from "@lit-labs/context";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { msg } from "@lit/localize";
import { AgentPubKey } from "@holochain/client";
import { AsyncStatus } from "@holochain-open-dev/stores";
import { SlSkeleton } from "@scoped-elements/shoelace";
import { StoreSubscriber } from "lit-svelte-stores";

import { Profile } from "../types";
import { sharedStyles } from "./utils/shared-styles";
import { ProfilesStore } from "../profiles-store";
import { profilesStoreContext } from "../context";
import { AgentAvatar } from "./agent-avatar";

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
  searchProfiles:
    | StoreSubscriber<AsyncStatus<ReadonlyMap<AgentPubKey, Profile>>>
    | undefined;

  @query("#textfield")
  private _textField!: TextField;
  @query("#overlay")
  private _overlay!: MenuSurface;

  firstUpdated() {
    this.addEventListener("blur", () => this._overlay.close());
  }

  onFilterChange() {
    if (this._textField.value.length < 3) {
      this.searchProfiles = undefined;
      return;
    }

    this._overlay.show();
    const store = this.store.searchProfiles(this._textField.value);
    this.searchProfiles = new StoreSubscriber(this, () => store);
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
      this.searchProfiles = undefined;
    } else {
      this._textField.value = profile.nickname;
    }
    this._overlay.close();
  }

  renderAgentList() {
    if (this.searchProfiles === undefined) return html``;

    switch (this.searchProfiles.value.status) {
      case "pending":
        return [0, 0, 0].map(
          () => html`<sl-skeleton></sl-skeleton><sl-skeleton> </sl-skeleton>`
        );
      case "error":
        return html`<span
          >${msg("There was an error while fetching the agents:")}
          ${this.searchProfiles.value.error}</span
        >`;
      case "complete": {
        const agents = this.searchProfiles.value.value;
        if (agents.size === 0)
          return html`<mwc-list-item
            >${msg("No agents match the filter")}</mwc-list-item
          >`;

        return html`
          <mwc-list
            style="min-width: 80px;"
            @selected=${(e: CustomEvent) =>
              this.onUsernameSelected(
                Array.from(agents.entries())[e.detail.index]
              )}
          >
            ${Array.from(agents.entries()).map(
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
      "sl-skeleton": SlSkeleton,
      "agent-avatar": AgentAvatar,
      "mwc-textfield": TextField,
      "mwc-menu-surface": MenuSurface,
      "mwc-list": List,
      "mwc-list-item": ListItem,
    };
  }
}
