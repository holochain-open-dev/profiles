import { LitElement, css, html, query, property } from 'lit-element';
import { ApolloClient } from '@apollo/client/core';

import '@vaadin/vaadin-combo-box/vaadin-combo-box-light';
import type {
  ComboBoxElement,
  ComboBoxItemModel,
} from '@vaadin/vaadin-combo-box';
import '@material/mwc-textfield';
import '@material/mwc-circular-progress';
import '@material/mwc-button';
import '@spectrum-web-components/avatar/sp-avatar.js';

import { Agent, Profile } from '../types';
import { sharedStyles } from '../sharedStyles';
import { SEARCH_PROFILES } from '../graphql/queries';
import { TextFieldBase } from '@material/mwc-textfield/mwc-textfield-base';

/**
 * @element hod-search-agent
 * @fires agent-selected - Fired when the user selects some agent. `event.detail.agent` will contain the agent selected
 */
export abstract class HodSearchAgent extends LitElement {
  /** Public attributes */

  /**
   * Whether to clear the field when an agent is selected
   * @attr clear-on-select
   */
  @property({ type: Boolean, attribute: 'clear-on-select' })
  clearOnSelect = false;

  /**
   * Label for the agent searching field
   * @attr field-label
   */
  @property({ type: String, attribute: 'field-label' })
  fieldLabel = 'Search agent';

  /** Dependencies */
  abstract get _apolloClient(): ApolloClient<any>;

  /** Private properties */

  _searchedAgents: Array<Agent> = [];

  _lastSearchedPrefix: string | undefined = undefined;

  @query('#combo-box')
  _comboBox!: ComboBoxElement;

  @query('#textfield')
  _textField!: TextFieldBase;

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

  async searchAgents(usernamePrefix: string): Promise<Array<Agent>> {
    const result = await this._apolloClient.query({
      query: SEARCH_PROFILES,
      variables: { usernamePrefix },
    });

    this._searchedAgents = result.data.profilesSearch;

    return this._searchedAgents;
  }

  firstUpdated() {
    this._comboBox.dataProvider = async (params, callback) => {
      const usernamePrefix = params.filter;

      if (usernamePrefix.length < 3) return callback([], 0);

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

    this._comboBox.renderer = (
      root: HTMLElement,
      comboBox: ComboBoxElement,
      model: ComboBoxItemModel
    ) => {
      const profile: Profile = this._searchedAgents.find(
        agent => agent.profile.username === model.item
      )?.profile as Profile;
      root.innerHTML = `
      <div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start;">
        <sp-avatar 
          style="
          --spectrum-avatar-small-height: 20px;
          --spectrum-avatar-small-width: 20px;
          margin-right: 8px;" 
          src="${profile.avatar}"
        ></sp-avatar>
        <span>${profile.username}</span>
      </div>`;
    };
  }

  onUsernameSelected(e: CustomEvent) {
    const username = e.detail.value;

    const agent = this._searchedAgents.find(
      agent => agent.profile.username === username
    );

    // If username matches agent, user has selected it
    if (agent) {
      this.dispatchEvent(
        new CustomEvent('agent-selected', {
          detail: {
            agent,
          },
        })
      );

      // If the consumer says so, clear the field
      if (this.clearOnSelect) {
        this._comboBox._clear();
      }
    }
  }

  render() {
    return html`
      <vaadin-combo-box-light
        id="combo-box"
        @value-changed=${this.onUsernameSelected}
        item-label-path="username"
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
}
