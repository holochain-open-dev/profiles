import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { StoreSubscriber } from 'lit-svelte-stores';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { contextProvided } from '@holochain-open-dev/context';
import { CircularProgress, ListItem, List, } from '@scoped-elements/material-web';
import { sharedStyles } from './utils/shared-styles';
import { profilesStoreContext } from '../context';
import { AgentAvatar } from './agent-avatar';
/**
 * @element list-profiles
 * @fires agent-selected - Fired when the user selects an agent from the list. Detail will have this shape: { agentPubKey: 'uhCAkSEspAJks5Q8863Jg1RJhuJHJpFWzwDJkxVjVSk9JueU' }
 */
export class ListProfiles extends ScopedElementsMixin(LitElement) {
    constructor() {
        /** Dependencies */
        super(...arguments);
        /** Private properties */
        this._loading = true;
        this._allProfiles = new StoreSubscriber(this, () => { var _a; return (_a = this.store) === null || _a === void 0 ? void 0 : _a.knownProfiles; });
    }
    async firstUpdated() {
        await this.store.fetchAllProfiles();
        this._loading = false;
    }
    initials(nickname) {
        return nickname
            .split(' ')
            .map(name => name[0])
            .join('');
    }
    fireAgentSelected(index) {
        const agentPubKey = Object.keys(this._allProfiles.value)[index];
        if (agentPubKey) {
            this.dispatchEvent(new CustomEvent('agent-selected', {
                bubbles: true,
                composed: true,
                detail: {
                    agentPubKey,
                },
            }));
        }
    }
    render() {
        if (this._loading)
            return html `<div class="fill center-content">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
        if (Object.keys(this._allProfiles.value).length === 0)
            return html `<mwc-list-item
        >There are no created profiles yet</mwc-list-item
      >`;
        return html `
      <mwc-list
        style="min-width: 80px;"
        @selected=${(e) => this.fireAgentSelected(e.detail.index)}
      >
        ${Object.entries(this._allProfiles.value).map(([agent_pub_key, profile]) => html `
            <mwc-list-item
              graphic="avatar"
              .value=${agent_pub_key}
              style="--mdc-list-item-graphic-size: 32px;"
            >
              <agent-avatar slot="graphic" .agentPubKey=${agent_pub_key}>
              </agent-avatar>
              <span>${profile.nickname}</span>
            </mwc-list-item>
          `)}
      </mwc-list>
    `;
    }
    /**
     * @ignore
     */
    static get scopedElements() {
        return {
            'agent-avatar': AgentAvatar,
            'mwc-circular-progress': CircularProgress,
            'mwc-list': List,
            'mwc-list-item': ListItem,
        };
    }
}
ListProfiles.styles = [
    sharedStyles,
    css `
      :host {
        display: flex;
      }
    `,
];
__decorate([
    contextProvided({ context: profilesStoreContext }),
    property({ type: Object })
], ListProfiles.prototype, "store", void 0);
__decorate([
    state()
], ListProfiles.prototype, "_loading", void 0);
//# sourceMappingURL=list-profiles.js.map