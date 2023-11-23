import { hashProperty, sharedStyles } from "@holochain-open-dev/elements";
import { StoreSubscriber } from "@holochain-open-dev/stores";
import { AgentPubKey } from "@holochain/client";
import { consume } from "@lit/context";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { localized, msg } from "@lit/localize";

import "./agent-avatar.js";
import "./profile-list-item-skeleton.js";
import { profilesStoreContext } from "../context.js";
import { ProfilesStore } from "../profiles-store.js";

/**
 * @element profile-list-item
 */
@localized()
@customElement("profile-list-item")
export class ProfileListItem extends LitElement {
  /**
   * REQUIRED: the public key of the agent to render the profile for
   */
  @property(hashProperty("agent-pub-key"))
  agentPubKey!: AgentPubKey;

  /**
   * Profiles store for this element, not required if you embed this element inside a <profiles-context>
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property()
  store!: ProfilesStore;

  /**
   * @internal
   */
  private _profile = new StoreSubscriber(
    this,
    () => this.store.profiles.get(this.agentPubKey),
    () => [this.store, this.agentPubKey]
  );

  render() {
    switch (this._profile.value.status) {
      case "pending":
        return html`<profile-list-item-skeleton></profile-list-item-skeleton>`;
      case "complete":
        return html`
          <div class="row" style="align-items: center; gap: 8px">
            <agent-avatar .agentPubKey=${this.agentPubKey}></agent-avatar>
            <span>${this._profile.value.value?.entry.nickname}</span>
          </div>
        `;
      case "error":
        return html`<display-error
          tooltip
          .headline=${msg("Error fetching the profile")}
          .error=${this._profile.value.error}
        ></display-error>`;
    }
  }

  static styles = [sharedStyles];
}
