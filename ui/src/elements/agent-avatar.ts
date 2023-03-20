import { consume } from "@lit-labs/context";
import { hashProperty, sharedStyles } from "@holochain-open-dev/elements";
import { css, html, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";
import { styleMap } from "lit-html/directives/style-map.js";
import { AgentPubKey } from "@holochain/client";
import { localized, msg } from "@lit/localize";
import { StoreSubscriber } from "@holochain-open-dev/stores";

import "@holochain-open-dev/elements/elements/display-error.js";
import "@holochain-open-dev/elements/elements/holo-identicon.js";
import "@shoelace-style/shoelace/dist/components/avatar/avatar.js";
import "@shoelace-style/shoelace/dist/components/skeleton/skeleton.js";

import { profilesStoreContext } from "../context.js";
import { ProfilesStore } from "../profiles-store.js";
import { Profile } from "../types.js";

@localized()
@customElement("agent-avatar")
export class AgentAvatar extends LitElement {
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

  /** Dependencies */

  /**
   * Profiles store for this element, not required if you embed this element inside a <profiles-context>
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property()
  store!: ProfilesStore;

  private _agentProfile = new StoreSubscriber(this, () =>
    this.store.profiles.get(this.agentPubKey)
  );

  renderIdenticon() {
    return html` <div
      style=${styleMap({
        position: "relative",
        height: `${this.size}px`,
        width: `${this.size}px`,
      })}
    >
      <holo-identicon .hash=${this.agentPubKey} .size=${this.size}>
      </holo-identicon>
      <div class="badge"><slot name="badge"></slot></div>
    </div>`;
  }

  renderProfile(profile: Profile | undefined) {
    if (!profile || !profile.fields.avatar) return this.renderIdenticon();

    return html`
      <div
        style=${styleMap({
          position: "relative",
          height: `${this.size}px`,
          width: `${this.size}px`,
        })}
      >
        <sl-avatar
          .image=${profile.fields.avatar}
          style="--size: ${this.size}px;"
        >
        </sl-avatar>
        <div class="badge"><slot name="badge"></slot></div>
      </div>
    `;
  }

  render() {
    if (this.store.config.avatarMode === "identicon")
      return this.renderIdenticon();

    switch (this._agentProfile.value.status) {
      case "pending":
        return html`<sl-skeleton
          effect="pulse"
          style="height: ${this.size}px; width: ${this.size}px"
        ></sl-skeleton>`;
      case "complete":
        return this.renderProfile(this._agentProfile.value.value);
      case "error":
        return html`
          <display-error
            tooltip
            .headline=${msg("Error fetching the agent's avatar")}
            .error=${this._agentProfile.value.error.data.data}
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
