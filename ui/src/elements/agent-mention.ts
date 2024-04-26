import { consume } from "@lit/context";
import { hashProperty, sharedStyles } from "@holochain-open-dev/elements";
import { css, html, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { AgentPubKey } from "@holochain/client";
import { localized, msg } from "@lit/localize";
import { EntryRecord } from "@holochain-open-dev/utils";
import { SignalWatcher } from "@holochain-open-dev/signals";

import "@holochain-open-dev/elements/dist/elements/display-error.js";
import "@holochain-open-dev/elements/dist/elements/holo-identicon.js";
import "@shoelace-style/shoelace/dist/components/avatar/avatar.js";
import "@shoelace-style/shoelace/dist/components/tag/tag.js";
import "@shoelace-style/shoelace/dist/components/skeleton/skeleton.js";
import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";

import { profilesStoreContext } from "../context.js";
import { ProfilesStore } from "../profiles-store.js";
import { Profile } from "../types.js";

@localized()
@customElement("agent-mention")
export class AgentMention extends SignalWatcher(LitElement) {
  /** Public properties */

  /**
   * REQUIRED. The public key identifying the agent whose profile is going to be shown.
   */
  @property(hashProperty("agent-pub-key"))
  agentPubKey!: AgentPubKey;

  /**
   * Size of the avatar image in pixels.
   */
  @property({ type: Number })
  size = 24;

  /** Dependencies */

  /**
   * Profiles store for this element, not required if you embed this element inside a <profiles-context>
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property()
  store!: ProfilesStore;

  renderAvatar(profile: EntryRecord<Profile> | undefined) {
    if (!profile || !profile.entry.fields.avatar) {
      return html` <div
        style=${styleMap({
          position: "relative",
          height: `${this.size}px`,
          width: `${this.size}px`,
        })}
      >
        <holo-identicon
          .disableCopy=${true}
          .disableTooltip=${true}
          .hash=${this.agentPubKey}
          .size=${this.size}
        >
        </holo-identicon>
      </div>`;
    }
    return html`
      <sl-avatar
        .image=${profile.entry.fields.avatar}
        style="--size: ${this.size}px;"
      >
      </sl-avatar>
    `;
  }

  renderProfile(profile: EntryRecord<Profile> | undefined) {
    return html`
      <div class="row">
        ${this.renderAvatar(profile)}
        <span style="margin-left: 8px">${profile?.entry.nickname}</span>
      </div>
    `;
  }

  renderContent() {
    const profile = this.store.profiles$.get(this.agentPubKey).get();
    switch (profile.status) {
      case "pending":
        return html`<sl-skeleton effect="pulse"></sl-skeleton>`;
      case "completed":
        return this.renderProfile(profile.value);
      case "error":
        return html`
          <display-error
            tooltip
            .headline=${msg("Error fetching the agent's avatar")}
            .error=${profile.error}
          ></display-error>
        `;
    }
  }

  render() {
    return html`
      <sl-tag pill style="display: inline-flex">${this.renderContent()}</sl-tag>
    `;
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: inline-flex;
      }
    `,
  ];
}
