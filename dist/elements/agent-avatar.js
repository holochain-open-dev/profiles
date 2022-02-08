import { __decorate } from "tslib";
import { contextProvided } from '@holochain-open-dev/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { profilesStoreContext } from '../context';
import { HoloIdenticon } from './holo-identicon';
import { SlAvatar, SlSkeleton } from '@scoped-elements/shoelace';
import { StoreSubscriber } from 'lit-svelte-stores';
import { sharedStyles } from './utils/shared-styles';
export class AgentAvatar extends ScopedElementsMixin(LitElement) {
    constructor() {
        /** Public properties */
        super(...arguments);
        /**
         * Size of the avatar image in pixels.
         */
        this.size = 32;
        this._profile = new StoreSubscriber(this, () => { var _a; return (_a = this.store) === null || _a === void 0 ? void 0 : _a.profileOf(this.agentPubKey); });
    }
    async firstUpdated() {
        if (this.store.config.avatarMode === 'avatar') {
            await this.store.fetchAgentProfile(this.agentPubKey);
        }
    }
    render() {
        if (this.store.config.avatarMode === 'identicon')
            return html `<holo-identicon
        .hash=${this.agentPubKey}
        .size=${this.size}
      ></holo-identicon>`;
        if (this._profile.value)
            return html `
        <sl-avatar
          .image=${this._profile.value.fields.avatar}
          style="--size: ${this.size}px;"
        >
          <div slot="icon"></div>
        </sl-avatar>
      `;
        return html `<sl-skeleton
      effect="pulse"
      style="height: ${this.size}px; width: ${this.size}px"
    ></sl-skeleton>`;
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
AgentAvatar.styles = [sharedStyles];
__decorate([
    property({
        attribute: 'agent-pub-key',
        type: String,
    })
], AgentAvatar.prototype, "agentPubKey", void 0);
__decorate([
    property({ type: Number })
], AgentAvatar.prototype, "size", void 0);
__decorate([
    contextProvided({ context: profilesStoreContext }),
    property({ type: Object })
], AgentAvatar.prototype, "store", void 0);
//# sourceMappingURL=agent-avatar.js.map