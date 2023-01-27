import { css, html, LitElement } from "lit";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { SlSkeleton } from "@scoped-elements/shoelace";
import { sharedStyles } from "@holochain-open-dev/elements";

/**
 * @element profile-list-item-skeleton
 */
export class ProfileListItemSkeleton extends ScopedElementsMixin(LitElement) {
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

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      "sl-skeleton": SlSkeleton,
    };
  }
}
