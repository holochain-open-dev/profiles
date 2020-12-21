import { __decorate } from "tslib";
import { css, html, query, property } from 'lit-element';
import { ComboBoxLightElement } from '@vaadin/vaadin-combo-box/vaadin-combo-box-light';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { Avatar } from '@spectrum-web-components/avatar';
import { sharedStyles } from '../sharedStyles';
import { BaseElement } from './base-element';
/**
 * @element hod-search-agent
 * @fires agent-selected - Fired when the user selects some agent. `event.detail.agent` will contain the agent selected
 */
export class HodSearchAgent extends BaseElement {
    constructor() {
        /** Public attributes */
        super(...arguments);
        /**
         * Whether to clear the field when an agent is selected
         * @attr clear-on-select
         */
        this.clearOnSelect = false;
        /**
         * Label for the agent searching field
         * @attr field-label
         */
        this.fieldLabel = 'Search agent';
        /** Private properties */
        this._searchedAgents = [];
        this._lastSearchedPrefix = undefined;
    }
    static get styles() {
        return [
            sharedStyles,
            css `
        :host {
          display: flex;
        }
      `,
        ];
    }
    async searchAgents(nicknamePrefix) {
        this._searchedAgents = await this._profilesService.searchProfiles(nicknamePrefix);
        return this._searchedAgents;
    }
    firstUpdated() {
        this._comboBox.dataProvider = async (params, callback) => {
            const nicknamePrefix = params.filter;
            if (nicknamePrefix.length < 3)
                return callback([], 0);
            let agents = this._searchedAgents;
            if (nicknamePrefix !== this._lastSearchedPrefix) {
                this._lastSearchedPrefix = nicknamePrefix;
                console.log('asdf');
                agents = await this.searchAgents(params.filter);
            }
            const nicknames = agents
                .map(agent => agent.profile.nickname)
                .filter(nickname => nickname.startsWith(nicknamePrefix));
            callback(nicknames, nicknames.length);
        };
        this._comboBox.renderer = (root, comboBox, model) => {
            var _a;
            const profile = (_a = this._searchedAgents.find(agent => agent.profile.nickname === model.item)) === null || _a === void 0 ? void 0 : _a.profile;
            root.innerHTML = `
      <div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start;">
        <sp-avatar 
          style="
          --spectrum-avatar-small-height: 20px;
          --spectrum-avatar-small-width: 20px;
          margin-right: 8px;" 
          src="${profile.fields.avatar}"
        ></sp-avatar>
        <span>${profile.nickname}</span>
      </div>`;
        };
    }
    onUsernameSelected(e) {
        const nickname = e.detail.value;
        const agent = this._searchedAgents.find(agent => agent.profile.nickname === nickname);
        // If nickname matches agent, user has selected it
        if (agent) {
            this.dispatchEvent(new CustomEvent('agent-selected', {
                detail: {
                    agent,
                },
            }));
            // If the consumer says so, clear the field
            if (this.clearOnSelect) {
                this._comboBox._clear();
            }
        }
    }
    render() {
        return html `
      <vaadin-combo-box-light
        id="combo-box"
        @value-changed=${this.onUsernameSelected}
        item-label-path="nickname"
      >
        <mwc-textfield
          id="textfield"
          class="input"
          .label=${this.fieldLabel}
          placeholder="At least 3 chars..."
          outlined
        >
        </mwc-textfield>
      </vaadin-combo-box-light>
    `;
    }
    static get scopedElements() {
        return {
            'sp-avatar': Avatar,
            'mwc-textfield': TextField,
            'vaadin-combo-box-light': ComboBoxLightElement,
        };
    }
}
__decorate([
    property({ type: Boolean, attribute: 'clear-on-select' })
], HodSearchAgent.prototype, "clearOnSelect", void 0);
__decorate([
    property({ type: String, attribute: 'field-label' })
], HodSearchAgent.prototype, "fieldLabel", void 0);
__decorate([
    query('#combo-box')
], HodSearchAgent.prototype, "_comboBox", void 0);
__decorate([
    query('#textfield')
], HodSearchAgent.prototype, "_textField", void 0);
//# sourceMappingURL=hod-search-agent.js.map