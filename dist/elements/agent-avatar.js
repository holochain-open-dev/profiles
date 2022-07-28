import { __decorate } from "tslib";
import { contextProvided } from '@lit-labs/context';
import { HoloIdenticon } from '@holochain-open-dev/utils';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit-html/directives/style-map.js';
import { SlAvatar, SlSkeleton } from '@scoped-elements/shoelace';
import { TaskSubscriber } from 'lit-svelte-stores';
import { profilesStoreContext } from '../context';
import { sharedStyles } from './utils/shared-styles';
export class AgentAvatar extends ScopedElementsMixin(LitElement) {
    constructor() {
        /** Public properties */
        super(...arguments);
        /**
         * Size of the avatar image in pixels.
         */
        this.size = 32;
        this._profileTask = new TaskSubscriber(this, () => this.store.fetchAgentProfile(this.agentPubKey), () => [this.store, this.agentPubKey]);
    }
    renderIdenticon() {
        return html ` <div
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
    renderProfile(profile) {
        if (!profile || !profile.fields.avatar)
            return this.renderIdenticon();
        return html `
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
            pending: () => html `<sl-skeleton
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
}
AgentAvatar.styles = [
    sharedStyles,
    css `
      .badge {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    `,
];
__decorate([
    property({
        type: Object,
    })
], AgentAvatar.prototype, "agentPubKey", void 0);
__decorate([
    property({ type: Number })
], AgentAvatar.prototype, "size", void 0);
__decorate([
    contextProvided({ context: profilesStoreContext, subscribe: true }),
    property({ type: Object })
], AgentAvatar.prototype, "store", void 0);
//# sourceMappingURL=agent-avatar.js.map