import { sharedStyles } from "@holochain-open-dev/elements";
import { AgentPubKey } from "@holochain/client";
import { localized } from "@lit/localize";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { SignalWatcher } from "@holochain-open-dev/signals";

/**
 * @element agents-avatars
 */
@localized()
@customElement("agents-avatars")
export class AgentsAvatars extends SignalWatcher(LitElement) {
  @property()
  agents!: AgentPubKey[];

  render() {
    return html`
      <div class="row avatar-group">
        ${this.agents
          .slice(0, 3)
          .map((a) => html`<agent-avatar .agentPubKey=${a}></agent-avatar>`)}
        ${this.agents.length > 3
          ? html`<sl-avatar
              .initials=${`+${this.agents.length - 3}`}
              style="--size: 32px"
            ></sl-avatar>`
          : html``}
      </div>
    `;
  }

  static styles = [
    css`
      .avatar-group agent-avatar:not(:first-of-type) {
        margin-left: -0.5rem;
      }
    `,
    sharedStyles,
  ];
}
