import { consume } from "@lit-labs/context";
import { AgentPubKey } from "@holochain/client";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { html, LitElement } from "lit";
import { StoreSubscriber } from "@holochain-open-dev/stores";
import { state, property } from "lit/decorators.js";
import { SlSkeleton } from "@scoped-elements/shoelace";
import { localized, msg } from "@lit/localize";
import {
  DisplayError,
  hashProperty,
  sharedStyles,
} from "@holochain-open-dev/elements";

import { profilesStoreContext } from "../context";
import { ProfilesStore } from "../profiles-store";
import { AgentAvatar } from "./agent-avatar";
import { Profile } from "../types";

/**
 * @element profile-detail
 */
@localized()
export class ProfileDetail extends ScopedElementsMixin(LitElement) {
  /** Public properties */

  /**
   * REQUIRED. Public key identifying the agent for which the profile should be shown
   */
  @property(hashProperty("agent-pub-key"))
  agentPubKey!: AgentPubKey;

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
  private _agentProfile = new StoreSubscriber(this, () =>
    this._store.profiles.get(this.agentPubKey)
  );

  getAdditionalFields(profile: Profile): Record<string, string> {
    const fields: Record<string, string> = {};

    for (const [key, value] of Object.entries(profile.fields)) {
      if (key !== "avatar") {
        fields[key] = value;
      }
    }

    return fields;
  }

  renderAdditionalField(fieldId: string, fieldValue: string) {
    return html`
      <div class="row" style="margin-top: 16px">
        <span style="margin-right: 16px; ">
          <strong
            >${fieldId.substring(0, 1).toUpperCase()}${fieldId.substring(
              1
            )}</strong
          ></span
        >
        <span>${fieldValue}</span>
      </div>
    `;
  }

  renderProfile(profile: Profile | undefined) {
    if (!profile)
      return html`<div
        class="column"
        style="align-items: center; justify-content: center; flex: 1;"
      >
        <span class="placeholder"
          >${msg("This agent hasn't created a profile yet")}</span
        >
      </div>`;

    return html`
      <div class="column">
        <div class="row" style="align-items: center">
          <agent-avatar .agentPubKey=${this.agentPubKey}></agent-avatar>
          <span style="font-size: 16px; margin-left: 8px;"
            >${profile.nickname}</span
          >

          <span style="flex: 1"></span>

          <slot name="action"></slot>
        </div>

        ${Object.entries(this.getAdditionalFields(profile)).map(
          ([key, value]) => this.renderAdditionalField(key, value)
        )}
      </div>
    `;
  }

  render() {
    switch (this._agentProfile.value.status) {
      case "pending":
        return html`
          <div class="column">
            <div class="row" style="align-items: center">
              <sl-skeleton
                effect="pulse"
                style="height: 32px; width: 32px; border-radius: 50%;"
              ></sl-skeleton>
              <div>
                <sl-skeleton
                  effect="pulse"
                  style="width: 122px; margin-left: 8px;"
                ></sl-skeleton>
              </div>
            </div>

            ${this._store.config.additionalFields.map(
              () => html`
                <sl-skeleton
                  effect="pulse"
                  style="width: 200px; margin-top: 16px;"
                ></sl-skeleton>
              `
            )}
          </div>
        `;
      case "complete":
        return this.renderProfile(this._agentProfile.value.value);
      case "error":
        return html`<display-error
          .error=${this._agentProfile.value.error.data.data}
        ></display-error>`;
    }
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      "display-error": DisplayError,
      "agent-avatar": AgentAvatar,
      "sl-skeleton": SlSkeleton,
    };
  }

  static styles = [sharedStyles];
}
