import { customElement, property, state, query } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { consume } from "@lit-labs/context";
import { localized, msg } from "@lit/localize";
import { AgentPubKey } from "@holochain/client";
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

import "./agent-avatar.js";
import "./profile-list-item-skeleton.js";
import "./search-agent-dropdown.js";

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

  /**
   * @internal
   */
  @state()
  value!: AgentPubKey | undefined;

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
  @query("#textfield")
  private _textField!: SlInput;

  @state()
  searchFilter = "";

  onUsernameSelected(agentPubKey: AgentPubKey, profile: Profile) {
    this.value = agentPubKey;

    // If the consumer says so, clear the field
    if (this.clearOnSelect) {
      this._textField.value = "";
    } else {
      this._textField.value = profile.nickname;
    }
    this.searchFilter = "";
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
        <search-agent-dropdown
          id="dropdown"
          .open=${this.searchFilter.length >= 3}
          style="flex: 1"
          .includeMyself=${this.includeMyself}
          .searchFilter=${this.searchFilter}
          @agent-selected=${(e: CustomEvent) =>
            this.onUsernameSelected(e.detail.agentPubKey, e.detail.profile)}
        >
          <sl-input
            id="textfield"
            .label=${this._label}
            .placeholder=${msg("At least 3 chars...")}
            @input=${(e: CustomEvent) => {
              this.searchFilter = (e.target as SlInput).value;
            }}
          ></sl-input>
        </search-agent-dropdown>
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
