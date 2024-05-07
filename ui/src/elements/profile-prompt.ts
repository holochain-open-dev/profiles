import { TemplateResult, css, html, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";
import { localized, msg } from "@lit/localize";
import { consume } from "@lit/context";
import {
  AsyncReadable,
  AsyncStatus,
  subscribe,
} from "@holochain-open-dev/stores";
import {
  sharedStyles,
} from "@holochain-open-dev/elements";

import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
import "@holochain-open-dev/elements/dist/elements/display-error.js";

import "./create-profile.js";

import { ProfilesStore } from "../profiles-store.js";
import { profilesStoreContext } from "../context.js";
import { Profile } from "../types.js";
import { EntryRecord } from "@holochain-open-dev/utils";

/**
 * @element profile-prompt
 * @slot hero - Will be displayed above the create-profile form when the user is prompted with it
 */
@localized()
@customElement("profile-prompt")
export class ProfilePrompt extends LitElement {
  /**
   * Profiles store for this element, not required if you embed this element inside a <profiles-context>
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @property()
  store!: ProfilesStore;

  /** Private properties */

  renderPrompt(myProfile: EntryRecord<Profile> | undefined) {
    if (myProfile) return html`<slot></slot>`;

    return html`
      <div
        class="column"
        style="align-items: center; justify-content: center; flex: 1; padding-bottom: 10px;"
      >
        <div class="column" style="align-items: center;">
          <slot name="hero"></slot>
          <create-profile></create-profile>
        </div>
      </div>
    `;
  }

  render() {
    return html`${subscribe(
      this.store.myProfile,
      withSpinnerAndDisplayError({
        complete: (p) => this.renderPrompt(p),
        error: {
          label: msg("Error fetching your profile"),
          tooltip: false,
        },
      })
    )}`;
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: flex;
          flex: 1;
        }
      `,
    ];
  }
}

export function withSpinnerAndDisplayError<T>(renderers: {
  complete: (value: T) => TemplateResult;
  error: ((error: any) => TemplateResult) | { label: string; tooltip: boolean };
}) {
  return renderAsyncStatus({
    pending: () => html`<div
      style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
    >
      <sl-spinner style="font-size: 2rem;"></sl-spinner>
    </div>`,
    error: (e: any) =>
      typeof renderers.error === "function"
        ? renderers.error(e)
        : html`<display-error
            .headline=${renderers.error?.label}
            .tooltip=${renderers.error?.tooltip}
            .error=${e}
          ></display-error> `,
    complete: renderers.complete,
  });
}

/**
 * Renders the given AsyncStatus with the given renderers
 */
export function renderAsyncStatus<T>(renderers: {
  complete: (value: T) => TemplateResult;
  error: (error: any) => TemplateResult;
  pending: () => TemplateResult;
}) {
  return (status: AsyncStatus<T>) => {
    switch (status.status) {
      case "complete":
        return renderers.complete(status.value);
      case "error":
        return renderers.error(status.error);
      default:
        return renderers.pending();
    }
  };
}
