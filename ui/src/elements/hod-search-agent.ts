import { LitElement, css, html, query } from 'lit-element';
import { ApolloClient } from '@apollo/client/core';

import '@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box';
import type { ComboBoxElement } from '@vaadin/vaadin-combo-box';
import '@material/mwc-textfield';
import '@material/mwc-circular-progress';
import '@material/mwc-button';

import { Agent } from '../types';
import { sharedStyles } from '../sharedStyles';
import { SEARCH_PROFILES } from '../graphql/queries';

/**
 * @element hod-search-agent
 */
export abstract class HodSearchAgent extends LitElement {
  /** Public attributes */

  /** Dependencies */
  abstract get _apolloClient(): ApolloClient<any>;

  /** Private properties */

  _searchedAgents: Array<Agent> = [];

  _lastSearchedPrefix: string | undefined = undefined;

  @query('#combo-box')
  _comboBox!: ComboBoxElement;

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

    this._searchedAgents = result.data.searchProfiles;

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
    }
  }

  render() {
    return html`
      <vaadin-combo-box
        label="Search agent"
        placeholder="At least 3 chars..."
        id="combo-box"
        @value-changed=${this.onUsernameSelected}
      ></vaadin-combo-box>
    `;
  }
}
