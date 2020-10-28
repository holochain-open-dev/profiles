import { __decorate } from "tslib";
import { LitElement, css, html, query } from 'lit-element';
import '@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box';
import '@material/mwc-textfield';
import '@material/mwc-circular-progress';
import '@material/mwc-button';
import { sharedStyles } from '../sharedStyles';
import { SEARCH_PROFILES } from '../graphql/queries';
/**
 * @element hod-search-agent
 * @fires agent-selected - Fired when the user selects some agent. `event.detail.agent` will contain the agent selected
 */
export class HodSearchAgent extends LitElement {
    constructor() {
        /** Public attributes */
        super(...arguments);
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
    async searchAgents(usernamePrefix) {
        const result = await this._apolloClient.query({
            query: SEARCH_PROFILES,
            variables: { usernamePrefix },
        });
        this._searchedAgents = result.data.searchProfiles;
        return this._searchedAgents;
    }
    firstUpdated() {
        this._comboBox.dataProvider = async (params, callback) => {
            const usernamePrefix = params.filter;
            if (usernamePrefix.length < 3)
                return callback([], 0);
            let agents = this._searchedAgents;
            if (usernamePrefix !== this._lastSearchedPrefix) {
                this._lastSearchedPrefix = usernamePrefix;
                agents = await this.searchAgents(params.filter);
            }
            const usernames = agents
                .map(agent => agent.profile.username)
                .filter(username => username.startsWith(usernamePrefix));
            callback(usernames, usernames.length);
        };
    }
    onUsernameSelected(e) {
        const username = e.detail.value;
        const agent = this._searchedAgents.find(agent => agent.profile.username === username);
        // If username matches agent, user has selected it
        if (agent) {
            this.dispatchEvent(new CustomEvent('agent-selected', {
                detail: {
                    agent,
                },
            }));
        }
    }
    render() {
        return html `
      <vaadin-combo-box
        label="Search agent"
        placeholder="At least 3 chars..."
        id="combo-box"
        @value-changed=${this.onUsernameSelected}
      ></vaadin-combo-box>
    `;
    }
}
__decorate([
    query('#combo-box')
], HodSearchAgent.prototype, "_comboBox", void 0);
//# sourceMappingURL=hod-search-agent.js.map