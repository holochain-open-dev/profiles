import { css, html, LitElement } from "lit";
import { AgentPubKey } from "@holochain/client";
import { ReadHoloHashMap } from "@holochain-open-dev/utils";
import { property } from "lit/decorators.js";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { consume } from "@lit-labs/context";
import {
  CircularProgress,
  ListItem,
  List,
} from "@scoped-elements/material-web";
import { StoreSubscriber } from "lit-svelte-stores";

import { sharedStyles } from "./utils/shared-styles";
import { ProfilesStore } from "../profiles-store";
import { profilesStoreContext } from "../context";
import { AgentAvatar } from "./agent-avatar";
import { Profile } from "../types";

/**
 * @element list-profiles
 * @fires agent-selected - Fired when the user selects an agent from the list. Detail will have this shape: { agentPubKey: 'uhCAkSEspAJks5Q8863Jg1RJhuJHJpFWzwDJkxVjVSk9JueU' }
 */
export class ListProfiles extends ScopedElementsMixin(LitElement) {
  /** Dependencies */

  /**
   * `ProfilesStore` that is requested via context.
   * Only set this property if you want to override the store requested via context.
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property({ type: Object })
  store!: ProfilesStore;

  /** Private properties */

  private _allProfiles = new StoreSubscriber(
    this,
    () => this.store.allProfiles
  );

  initials(nickname: string): string {
    return nickname
      .split(" ")
      .map((name) => name[0])
      .join("");
  }

  fireAgentSelected(agentPubKey: AgentPubKey) {
    if (agentPubKey) {
      this.dispatchEvent(
        new CustomEvent("agent-selected", {
          bubbles: true,
          composed: true,
          detail: {
            agentPubKey,
          },
        })
      );
    }
  }

  renderList(profiles: ReadHoloHashMap<AgentPubKey, Profile>) {
    if (profiles.keys().length === 0)
      return html`<mwc-list-item
        >There are no created profiles yet</mwc-list-item
      >`;

    return html`
      <mwc-list
        style="min-width: 80px; flex: 1;"
        @selected=${(e: CustomEvent) =>
          this.fireAgentSelected(profiles.keys()[e.detail.index])}
      >
        ${profiles.entries().map(
          ([agent_pub_key, profile]) => html`
            <mwc-list-item
              graphic="avatar"
              .value=${agent_pub_key.toString()}
              style="--mdc-list-item-graphic-size: 32px;"
            >
              <agent-avatar slot="graphic" .agentPubKey=${agent_pub_key}>
              </agent-avatar>
              <span>${profile.nickname}</span>
            </mwc-list-item>
          `
        )}
      </mwc-list>
    `;
  }

  render() {
    switch (this._allProfiles.value.status) {
      case "pending":
        return html`<div class="fill center-content">
          <mwc-circular-progress indeterminate></mwc-circular-progress>
        </div>`;
      case "error":
        return html`<span
          >There was an error loading the profiles:
          ${this._allProfiles.value.error}<span></span
        ></span>`;
      case "complete":
        return this.renderList(this._allProfiles.value.value);
    }
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
      }
    `,
  ];

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      "agent-avatar": AgentAvatar,
      "mwc-circular-progress": CircularProgress,
      "mwc-list": List,
      "mwc-list-item": ListItem,
    };
  }
}
