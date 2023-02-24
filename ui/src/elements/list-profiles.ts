import { css, html, LitElement } from "lit";
import { AgentPubKey } from "@holochain/client";
import { state } from "lit/decorators.js";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { consume } from "@lit-labs/context";
import { MdListItem, MdList } from "@scoped-elements/material-web";
import { DisplayError, sharedStyles } from "@holochain-open-dev/elements";
import { StoreSubscriber } from "@holochain-open-dev/stores";
import { localized, msg } from "@lit/localize";

import { ProfilesStore } from "../profiles-store";
import { profilesStoreContext } from "../context";
import { AgentAvatar } from "./agent-avatar";
import { ProfileListItemSkeleton } from "./profile-list-item-skeleton";
import { Profile } from "../types";

/**
 * @element list-profiles
 * @fires agent-selected - Fired when the user selects an agent from the list. Detail will have this shape: { agentPubKey: <AGENT_PUB_KEY as Uint8Array> }
 */
@localized()
export class ListProfiles extends ScopedElementsMixin(LitElement) {
  /**
   * @internal
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @state()
  _store!: ProfilesStore;

  /** Private properties */

  /**
   * @internal
   */
  private _allProfiles = new StoreSubscriber(
    this,
    () => this._store.allProfiles
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

  renderList(profiles: ReadonlyMap<AgentPubKey, Profile>) {
    if (profiles.size === 0)
      return html`<md-list-item
        .headline=${msg("There are no created profiles yet")}
      ></md-list-item>`;

    return html`
      <md-list
        style="min-width: 80px; flex: 1;"
        @selected=${(e: CustomEvent) =>
          this.fireAgentSelected(Array.from(profiles.keys())[e.detail.index])}
      >
        ${Array.from(profiles.entries()).map(
          ([agent_pub_key, profile]) => html`
            <md-list-item .headline=${profile.nickname}>
              <agent-avatar slot="start" .agentPubKey=${agent_pub_key}>
              </agent-avatar>
            </md-list-item>
          `
        )}
      </md-list>
    `;
  }

  render() {
    switch (this._allProfiles.value.status) {
      case "pending":
        return html`<div class="column center-content">
          <profile-list-item-skeleton> </profile-list-item-skeleton>
          <profile-list-item-skeleton> </profile-list-item-skeleton>
          <profile-list-item-skeleton> </profile-list-item-skeleton>
        </div>`;
      case "error":
        return html`<display-error
          .error=${this._allProfiles.value.error.data.data}
        ></display-error>`;
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
      "profile-list-item-skeleton": ProfileListItemSkeleton,
      "md-list": MdList,
      "display-error": DisplayError,
      "md-list-item": MdListItem,
    };
  }
}
