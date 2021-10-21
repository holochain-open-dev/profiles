import { __decorate } from "tslib";
import { contextProvided } from '@lit-labs/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { profilesStoreContext } from '../context';
import { HoloIdenticon } from './holo-identicon';
import { lightTheme, SlAvatar, SlSkeleton } from '@scoped-elements/shoelace';
import { StoreSubscriber } from 'lit-svelte-stores';
export class AgentAvatar extends ScopedElementsMixin(LitElement) {
    constructor() {
        /** Public properties */
        super(...arguments);
        this.size = 32;
        this._profile = new StoreSubscriber(this, () => this._store.profileOf(this.agentPubKey));
    }
    async firstUpdated() {
        if (this._store.config.avatarMode === 'avatar') {
            await this._store.fetchAgentProfile(this.agentPubKey);
        }
    }
    render() {
        if (this._store.config.avatarMode === 'identicon')
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
    static get scopedElements() {
        return {
            'holo-identicon': HoloIdenticon,
            'sl-avatar': SlAvatar,
            'sl-skeleton': SlSkeleton,
        };
    }
}
AgentAvatar.styles = [lightTheme];
__decorate([
    property({
        attribute: 'agent-pub-key',
    })
], AgentAvatar.prototype, "agentPubKey", void 0);
__decorate([
    property()
], AgentAvatar.prototype, "size", void 0);
__decorate([
    contextProvided({ context: profilesStoreContext })
], AgentAvatar.prototype, "_store", void 0);
//# sourceMappingURL=agent-avatar.js.map