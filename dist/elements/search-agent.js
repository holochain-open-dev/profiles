import { __decorate } from "tslib";
import { css, html } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { MenuSurface } from 'scoped-material-components/mwc-menu-surface';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import Avatar from '@ui5/webcomponents/dist/Avatar';
import { requestContext } from '@holochain-open-dev/context';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { PROFILES_STORE_CONTEXT } from '../types';
import { sharedStyles } from './utils/shared-styles';
/**
 * @element search-agent
 * @fires agent-selected - Fired when the user selects some agent. `event.detail.agent` will contain the agent selected
 */
export class SearchAgent extends ScopedRegistryHost(MobxLitElement) {
    constructor() {
        /** Public attributes */
        super(...arguments);
        /**
         * Whether to clear the field when an agent is selected
         * @attr clear-on-select
         */
        this.clearOnSelect = false;
        /**
         * Whether to include my own agent as a possible agent to select
         * @attr include-myself
         */
        this.includeMyself = false;
        /**
         * Label for the agent searching field
         * @attr field-label
         */
        this.fieldLabel = 'Search agent';
        this._currentFilter = undefined;
        this._lastSearchedPrefix = undefined;
    }
    /** Private properties */
    get _filteredAgents() {
        let filtered = this._store.knownProfiles.filter(agent => agent.profile.nickname.startsWith(this._currentFilter));
        if (!this.includeMyself) {
            filtered = filtered.filter(agent => this._store.myAgentPubKey !== agent.agent_pub_key);
        }
        return filtered;
    }
    firstUpdated() {
        this.addEventListener('blur', () => this._overlay.close());
    }
    async searchAgents(nicknamePrefix) {
        this._lastSearchedPrefix = nicknamePrefix;
        await this._store.searchProfiles(nicknamePrefix);
    }
    onFilterChange() {
        if (this._textField.value.length < 3)
            return;
        this._overlay.show();
        this._currentFilter = this._textField.value;
        const filterPrefix = this._currentFilter.slice(0, 3);
        if (filterPrefix !== this._lastSearchedPrefix) {
            this.searchAgents(filterPrefix);
        }
    }
    onUsernameSelected(agent) {
        // If nickname matches agent, user has selected it
        if (agent) {
            this.dispatchEvent(new CustomEvent('agent-selected', {
                detail: {
                    agent,
                },
            }));
            // If the consumer says so, clear the field
            if (this.clearOnSelect) {
                this._textField.value = '';
                this._currentFilter = undefined;
            }
            else {
                this._textField.value = agent.profile.nickname;
            }
            this._overlay.close();
        }
    }
    render() {
        return html `
      <div style="position: relative; flex: 1; display: flex;">
        <mwc-textfield
          id="textfield"
          style="flex: 1;"
          class="input"
          .label=${this.fieldLabel}
          placeholder="At least 3 chars..."
          outlined
          @input=${() => this.onFilterChange()}
          @focus=${() => this._currentFilter && this._overlay.show()}
        >
        </mwc-textfield>
        <mwc-menu-surface absolute id="overlay" x="4" y="28">
          ${this._filteredAgents.length > 0
            ? this._filteredAgents.map(agent => html `
                  <mwc-list
                    @selected=${(e) => this.onUsernameSelected(this._filteredAgents[e.detail.index])}
                    activatable
                    style="min-width: 80px;"
                  >
                    <mwc-list-item
                      graphic="avatar"
                      .value=${agent.agent_pub_key}
                    >
                      <ui5-avatar
                        slot="graphic"
                        image="${agent.profile.fields.avatar}"
                        size="XS"
                      ></ui5-avatar>
                      <span style="margin-left: 8px;"
                        >${agent.profile.nickname}</span
                      >
                    </mwc-list-item>
                  </mwc-list>
                `)
            : html `<mwc-list-item>No agents match the filter</mwc-list-item>`}
        </mwc-menu-surface>
      </div>
    `;
    }
    static get styles() {
        return [
            sharedStyles,
            css `
        :host {
          display: flex;
        }
        #list {
          margin-top: 16px;
          margin-left: 16px;
        }
      `,
        ];
    }
}
SearchAgent.elementDefinitions = {
    'ui5-avatar': Avatar,
    'mwc-textfield': TextField,
    'mwc-menu-surface': MenuSurface,
    'mwc-list': List,
    'mwc-list-item': ListItem,
};
__decorate([
    property({ type: Boolean, attribute: 'clear-on-select' })
], SearchAgent.prototype, "clearOnSelect", void 0);
__decorate([
    property({ type: Boolean, attribute: 'include-myself' })
], SearchAgent.prototype, "includeMyself", void 0);
__decorate([
    property({ type: String, attribute: 'field-label' })
], SearchAgent.prototype, "fieldLabel", void 0);
__decorate([
    state()
], SearchAgent.prototype, "_currentFilter", void 0);
__decorate([
    query('#textfield')
], SearchAgent.prototype, "_textField", void 0);
__decorate([
    query('#overlay')
], SearchAgent.prototype, "_overlay", void 0);
__decorate([
    requestContext(PROFILES_STORE_CONTEXT)
], SearchAgent.prototype, "_store", void 0);
//# sourceMappingURL=search-agent.js.map