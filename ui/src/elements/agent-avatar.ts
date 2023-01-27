import { consume } from "@lit-labs/context";
import {
  HoloIdenticon,
  hashProperty,
  sharedStyles,
  DisplayError,
} from "@holochain-open-dev/elements";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { css, html, LitElement } from "lit";
import { state, property } from "lit/decorators.js";
import { styleMap } from "lit-html/directives/style-map.js";
import { SlAvatar, SlSkeleton } from "@scoped-elements/shoelace";
import { AgentPubKey } from "@holochain/client";
import { localized } from "@lit/localize";
import { StoreSubscriber } from "@holochain-open-dev/stores";

import { profilesStoreContext } from "../context";
import { ProfilesStore } from "../profiles-store";
import { Profile } from "../types";

@localized()
export class AgentAvatar extends ScopedElementsMixin(LitElement) {
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
   * @internal
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @state()
  _store!: ProfilesStore;

  private _agentProfile = new StoreSubscriber(this, () =>
    this._store.agentsProfiles.get(this.agentPubKey)
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
    if (this._store.config.avatarMode === "identicon")
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
            .error=${this._agentProfile.value.error.data.data}
          ></display-error>
        `;
    }
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      "holo-identicon": HoloIdenticon,
      "sl-avatar": SlAvatar,
      "sl-skeleton": SlSkeleton,
      "display-error": DisplayError,
    };
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
