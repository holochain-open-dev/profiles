import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { sharedStyles } from "@holochain-open-dev/elements";

import "@shoelace-style/shoelace/dist/components/skeleton/skeleton.js";

/**
 * @element profile-list-item-skeleton
 */
@customElement("profile-list-item-skeleton")
export class ProfileListItemSkeleton extends LitElement {
  render() {
    return html`<div class="row" style="align-items: center; width: 150px">
      <sl-skeleton
        effect="sheen"
        style="height: 32px; width: 32px; border-radius: 50%; margin: 8px"
      ></sl-skeleton
      ><sl-skeleton
        effect="sheen"
        style="flex: 1; margin: 8px; border-radius: 12px"
      >
      </sl-skeleton>
    </div>`;
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: flex;
        }
      `,
    ];
  }
}
