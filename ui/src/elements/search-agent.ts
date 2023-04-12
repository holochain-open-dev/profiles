import { customElement, property, state, query } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { consume } from "@lit-labs/context";
import { localized, msg } from "@lit/localize";
import {
  AgentPubKey,
  decodeHashFromBase64,
  encodeHashToBase64,
} from "@holochain/client";
import { AsyncStatus, StoreSubscriber } from "@holochain-open-dev/stores";
import {
  FormField,
  FormFieldController,
  hashProperty,
  sharedStyles,
} from "@holochain-open-dev/elements";

import "@holochain-open-dev/elements/dist/elements/display-error.js";
import "@shoelace-style/shoelace/dist/components/skeleton/skeleton.js";
import "@shoelace-style/shoelace/dist/components/menu/menu.js";
import "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js";
import "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input";
import SlDropdown from "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js";

import "./agent-avatar.js";
import "./profile-list-item-skeleton.js";

import { Profile } from "../types.js";
import { ProfilesStore } from "../profiles-store.js";
import { profilesStoreContext } from "../context.js";

/**
 * @element search-agent
 * @fires agent-selected - Fired when the user selects some agent. Detail will have this shape: { agentPubKey: HoloHash }
 */
@localized()
@customElement("search-agent")
export class SearchAgent extends LitElement implements FormField {
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
  @property(hashProperty("default-value"))
  defaultValue: AgentPubKey | undefined;

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
  fieldLabel!: string;

  /**
   * Profiles store for this element, not required if you embed this element inside a <profiles-context>
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property()
  store!: ProfilesStore;

  /**
   * @internal
   */
  @state()
  value!: AgentPubKey | undefined;

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

    return invalid;
  }

  async reset() {
    this.value = this.defaultValue;
    if (this.defaultValue) {
      const profile = await this.store.client.getAgentProfile(
        this.defaultValue
      );
      this._textField.value = profile?.nickname || "";
    } else {
      this._textField.value = "";
    }
  }

  /**
   * @internal
   */
  @state()
  private _searchProfiles:
    | StoreSubscriber<AsyncStatus<ReadonlyMap<AgentPubKey, Profile>>>
    | undefined;

  /**
   * @internal
   */
  @query("#textfield")
  private _textField!: SlInput;

  /**
   * @internal
   */
  @query("#dropdown")
  private dropdown!: SlDropdown;

  onFilterChange() {
    if ((this._textField as any).value.length < 3) {
      this._searchProfiles = undefined;
      return;
    }

    this.dropdown.show();
    const store = this.store.searchProfiles((this._textField as any).value);
    this._searchProfiles = new StoreSubscriber(this, () => store);
  }

  onUsernameSelected(agentPubKey: AgentPubKey) {
    this.dispatchEvent(
      new CustomEvent("agent-selected", {
        detail: {
          agentPubKey,
        },
      })
    );
    this.value = agentPubKey;

    // If the consumer says so, clear the field
    if (this.clearOnSelect) {
      this._textField.value = "";
      this._searchProfiles = undefined;
    } else if (this._searchProfiles?.value.status === "complete") {
      this._textField.value =
        this._searchProfiles.value.value.get(agentPubKey)!.nickname;
    }
    this.dropdown.hide();
  }

  renderAgentList() {
    if (this._searchProfiles === undefined) return html``;
    switch (this._searchProfiles.value.status) {
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
            .error=${this._searchProfiles.value.error.data.data}
          ></display-error>
        `;
      case "complete": {
        const agents = this._searchProfiles.value.value;
        if (agents.size === 0)
          return html`<sl-menu-item>
            ${msg("No agents match the filter")}
          </sl-menu-item>`;

        return html`
          ${Array.from(agents.entries()).map(
            ([pubkey, profile]) => html`
              <sl-menu-item .value=${encodeHashToBase64(pubkey)}>
                <agent-avatar
                  slot="prefix"
                  .agentPubKey=${pubkey}
                  style="margin-right: 16px"
                ></agent-avatar>
                ${profile.nickname}
              </sl-menu-item>
            `
          )}
        `;
      }
    }
  }

  /**
   * @internal
   */
  get _label() {
    let l = this.fieldLabel ? this.fieldLabel : msg("Search Agent");

    if (this.required !== false) l = `${l} *`;

    return l;
  }

  render() {
    return html`
      <div style="flex: 1; display: flex;">
        <sl-dropdown id="dropdown">
          <sl-input
            id="textfield"
            slot="trigger"
            .label=${this._label}
            .placeholder=${msg("At least 3 chars...")}
            @input=${() => this.onFilterChange()}
          ></sl-input>
          <sl-menu
            @sl-select=${(e: CustomEvent) => {
              this.onUsernameSelected(
                decodeHashFromBase64(e.detail.item.value)
              );
            }}
          >
            ${this.renderAgentList()}
          </sl-menu>
        </sl-dropdown>
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
  // static get scopedElements() {
  //   return {
  //     "sl-skeleton": SlSkeleton,
  //     "agent-avatar": AgentAvatar,
  //     "md-outlined-text-field": MdOutlinedTextField,
  //     "md-menu-surface": MdMenuSurface,
  //     "md-list": MdList,
  //     "display-error": DisplayError,
  //     "md-list-item": MdListItem,
  //     "profile-list-item-skeleton": ProfileListItemSkeleton,
  //   };
  // }
}
