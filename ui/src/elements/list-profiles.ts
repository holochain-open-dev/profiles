import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AgentPubKey } from "@holochain/client";
import { consume } from "@lit/context";
import { sharedStyles } from "@holochain-open-dev/elements";
import { localized, msg } from "@lit/localize";
import { SignalWatcher } from "@holochain-open-dev/signals";

import "@holochain-open-dev/elements/dist/elements/display-error.js";
import "./agent-avatar.js";
import "./profile-list-item-skeleton.js";

import { ProfilesStore } from "../profiles-store";
import { profilesStoreContext } from "../context";
import { Profile } from "../types";
import { EntryRecord } from "@holochain-open-dev/utils";

/**
 * @element list-profiles
 * @fires agent-selected - Fired when the user selects an agent from the list. Detail will have this shape: { agentPubKey: <AGENT_PUB_KEY as Uint8Array> }
 */
@localized()
@customElement("list-profiles")
export class ListProfiles extends SignalWatcher(LitElement) {
  /**
   * Profiles store for this element, not required if you embed this element inside a <profiles-context>
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property()
  store!: ProfilesStore;

  /** Private properties */

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

  renderList(profiles: ReadonlyMap<AgentPubKey, EntryRecord<Profile>>) {
    if (profiles.size === 0)
      return html`<span>${msg("There are no created profiles yet")} ></span>`;

    return html`
      <div style="min-width: 80px; flex: 1;" }>
        ${Array.from(profiles.entries()).map(
          ([agent_pub_key, profile]) => html`
            <div class="row" style="align-items: center; margin-bottom: 16px;">
              <agent-avatar
                style="margin-right: 8px;"
                .agentPubKey=${agent_pub_key}
                @click=${() => this.fireAgentSelected(agent_pub_key)}
              >
              </agent-avatar
              ><span> ${profile.entry.nickname}</span>
            </div>
          `
        )}
      </div>
    `;
  }

  render() {
    const allProfiles = this.store.allProfiles$.get();

    switch (allProfiles.status) {
      case "pending":
        return html`<div class="column center-content">
          <profile-list-item-skeleton> </profile-list-item-skeleton>
          <profile-list-item-skeleton> </profile-list-item-skeleton>
          <profile-list-item-skeleton> </profile-list-item-skeleton>
        </div>`;
      case "error":
        return html`<display-error
          .headline=${msg("Error fetching the profiles for all agents")}
          .error=${allProfiles.error}
        ></display-error>`;
      case "completed":
        return this.renderList(allProfiles.value);
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
}
