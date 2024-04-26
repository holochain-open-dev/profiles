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
import "@shoelace-style/shoelace/dist/components/skeleton/skeleton.js";
import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";

import { profilesStoreContext } from "../context.js";
import { ProfilesStore } from "../profiles-store.js";
import { Profile } from "../types.js";

@localized()
@customElement("agent-avatar")
export class AgentAvatar extends SignalWatcher(LitElement) {
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
  size = 32;

  /**
   * Disables showing the tooltip for the public key
   */
  @property({ type: Boolean, attribute: "disable-tooltip" })
  disableTooltip = false;

  /**
   * Disable copying of the public key on click
   */
  @property({ type: Boolean, attribute: "disable-copy" })
  disableCopy = false;

  /** Dependencies */

  /**
   * Profiles store for this element, not required if you embed this element inside a <profiles-context>
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property()
  store!: ProfilesStore;

  renderIdenticon() {
    return html` <div
      style=${styleMap({
        position: "relative",
        height: `${this.size}px`,
        width: `${this.size}px`,
      })}
    >
      <holo-identicon
        .disableCopy=${this.disableCopy}
        .disableTooltip=${this.disableTooltip}
        .hash=${this.agentPubKey}
        .size=${this.size}
      >
      </holo-identicon>
      <div class="badge"><slot name="badge"></slot></div>
    </div>`;
  }

  /**
   * @internal
   */
  timeout: any;

  renderProfile(profile: EntryRecord<Profile> | undefined) {
    if (!profile || !profile.entry.fields.avatar) return this.renderIdenticon();

    const contents = html`
      <div
        style=${styleMap({
          cursor: this.disableCopy ? "" : "pointer",
          position: "relative",
          height: `${this.size}px`,
          width: `${this.size}px`,
        })}
      >
        <sl-avatar
          .image=${profile.entry.fields.avatar}
          style="--size: ${this.size}px;"
          @click=${() =>
            this.dispatchEvent(
              new CustomEvent("profile-clicked", {
                composed: true,
                bubbles: true,
                detail: {
                  agentPubKey: this.agentPubKey,
                },
              })
            )}
        >
        </sl-avatar>
        <div class="badge"><slot name="badge"></slot></div>
      </div>
    `;

    return html`
      <sl-tooltip
        id="tooltip"
        placement="top"
        .trigger=${this.disableTooltip ? "manual" : "hover focus"}
        hoist
        .content=${profile.entry.nickname}
      >
        ${contents}
      </sl-tooltip>
    `;
  }

  render() {
    if (this.store.config.avatarMode === "identicon")
      return this.renderIdenticon();

    const profile = this.store.profiles$.get(this.agentPubKey).get();

    switch (profile.status) {
      case "pending":
        return html`<sl-skeleton
          effect="pulse"
          style="height: ${this.size}px; width: ${this.size}px"
        ></sl-skeleton>`;
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

  static styles = [
    sharedStyles,
    css`
      .badge {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    `,
  ];
}
