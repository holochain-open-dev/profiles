import { consume } from "@lit-labs/context";
import { hashProperty, sharedStyles } from "@holochain-open-dev/elements";
import { css, html, LitElement } from "lit";
import { state, property, customElement } from "lit/decorators.js";
import { styleMap } from "lit-html/directives/style-map.js";
import { AgentPubKey, encodeHashToBase64 } from "@holochain/client";
import { localized, msg } from "@lit/localize";
import { StoreSubscriber } from "@holochain-open-dev/stores";
import { SlTooltip } from "@shoelace-style/shoelace";

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

  /**
   * @internal
   */
  private _agentProfile = new StoreSubscriber(
    this,
    () => this.store.profiles.get(this.agentPubKey),
    () => [this.agentPubKey]
  );

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
  @state()
  justCopiedHash = false;

  /**
   * @internal
   */
  timeout: any;

  async copyHash() {
    await navigator.clipboard.writeText(encodeHashToBase64(this.agentPubKey));

    if (this.timeout) clearTimeout(this.timeout);

    this.justCopiedHash = true;
    (this.shadowRoot!.getElementById("tooltip") as SlTooltip).show();

    this.timeout = setTimeout(() => {
      (this.shadowRoot!.getElementById("tooltip") as SlTooltip).hide();
      setTimeout(() => {
        this.justCopiedHash = false;
      }, 100);
    }, 2000);
  }

  renderProfile(profile: Profile | undefined) {
    if (!profile || !profile.fields.avatar) return this.renderIdenticon();

    const contents = html`
      <div
        @click=${() => {
          if (!this.disableCopy) this.copyHash();
        }}
        style=${styleMap({
          cursor: this.disableCopy ? "" : "pointer",
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

    return html`
      <sl-tooltip
        id="tooltip"
        placement="top"
        .content=${this.justCopiedHash || this.disableTooltip
          ? msg("Copied!")
          : `${encodeHashToBase64(this.agentPubKey).substring(0, 6)}...`}
        .trigger=${this.disableTooltip || this.justCopiedHash
          ? "manual"
          : "hover focus"}
        hoist
      >
        ${contents}
      </sl-tooltip>
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
            .error=${this._agentProfile.value.error}
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
