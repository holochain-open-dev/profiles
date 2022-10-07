import { contextProvided } from '@lit-labs/context';
import { deserializeHash } from '@holochain-open-dev/utils';
import { HoloIdenticon } from '@holochain-open-dev/elements';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit-html/directives/style-map.js';
import { SlAvatar, SlSkeleton } from '@scoped-elements/shoelace';
import { TaskSubscriber } from 'lit-svelte-stores';
import { AgentPubKeyB64 } from '@holochain-open-dev/core-types';

import { profilesStoreContext } from '../context';
import { ProfilesStore } from '../profiles-store';
import { sharedStyles } from './utils/shared-styles';
import { Profile } from '../types';

export class AgentAvatar extends ScopedElementsMixin(LitElement) {
  /** Public properties */

  /**
   * REQUIRED. The public key identifying the agent whose profile is going to be shown.
   */
  @property({
    type: String,
    attribute: 'agent-pub-key'
  })
  agentPubKey!: AgentPubKeyB64;

  /**
   * Size of the avatar image in pixels.
   */
  @property({ type: Number })
  size = 32;

  /** Dependencies */

  /**
   * `ProfilesStore` that is requested via context.
   * Only set this property if you want to override the store requested via context.
   */
  @contextProvided({ context: profilesStoreContext, subscribe: true })
  @property({ type: Object })
  store!: ProfilesStore;

  private _profileTask = new TaskSubscriber(
    this,
    () => this.store.fetchAgentProfile(deserializeHash(this.agentPubKey)),
    () => [this.store, this.agentPubKey]
  );

  renderIdenticon() {
    return html` <div
      style=${styleMap({
        position: 'relative',
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
          position: 'relative',
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
    if (this.store.config.avatarMode === 'identicon')
      return this.renderIdenticon();

    return this._profileTask.render({
      complete: profile => this.renderProfile(profile),
      pending: () => html`<sl-skeleton
        effect="pulse"
        style="height: ${this.size}px; width: ${this.size}px"
      ></sl-skeleton>`,
    });
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      'holo-identicon': HoloIdenticon,
      'sl-avatar': SlAvatar,
      'sl-skeleton': SlSkeleton,
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
