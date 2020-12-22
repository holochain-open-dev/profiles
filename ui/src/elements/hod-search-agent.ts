import { css, html, query, property } from 'lit-element';

import { TextField } from 'scoped-material-components/mwc-textfield';
import { MenuSurface } from 'scoped-material-components/mwc-menu-surface';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import Avatar from '@ui5/webcomponents/dist/Avatar';

import { AgentProfile, Profile } from '../types';
import { sharedStyles } from '../sharedStyles';
import { BaseElement } from './base-element';

/**
 * @element hod-search-agent
 * @fires agent-selected - Fired when the user selects some agent. `event.detail.agent` will contain the agent selected
 */
export class HodSearchAgent extends BaseElement {
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

  /** Private properties */

  @property({ type: Array })
  _searchedAgents: Array<AgentProfile> = [];

  get _filteredAgents(): Array<AgentProfile> {
    return this._searchedAgents.filter(agent =>
      agent.profile.nickname.startsWith(this._currentFilter as string)
    );
  }

  @property({ type: String })
  _currentFilter: string | undefined = undefined;

  _lastSearchedPrefix: string | undefined = undefined;

  @query('#textfield')
  _textField!: TextField;
  @query('#overlay')
  _overlay!: MenuSurface;

  static get styles() {
    return [
      sharedStyles,
      css`
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
  firstUpdated() {
    this.addEventListener('blur', () => this._overlay.close());
  }

  async searchAgents(nicknamePrefix: string): Promise<Array<AgentProfile>> {
    this._lastSearchedPrefix = nicknamePrefix;
    this._searchedAgents = await this._profilesService.searchProfiles(
      nicknamePrefix
    );

    return this._searchedAgents;
  }

  onFilterChange() {
    if (this._textField.value.length < 3) return;

    this._overlay.show();

    this._currentFilter = this._textField.value;

    const filterPrefix = this._currentFilter.slice(0, 3);
    if (filterPrefix !== this._lastSearchedPrefix) {
      this.searchAgents(filterPrefix);
    }
  }

  onUsernameSelected(e: CustomEvent) {
    const agent = this._searchedAgents[e.detail.index];

    // If nickname matches agent, user has selected it
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
        this._textField.value = '';
      } else {
        this._textField.value = agent.profile.nickname;
      }
      this._overlay.close();
    }
  }

  render() {
    return html`
      <div style="position: relative">
        <mwc-textfield
          id="textfield"
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
            ? this._filteredAgents.map(
                agent => html`
                  <mwc-list
                    @selected=${(e: CustomEvent) => this.onUsernameSelected(e)}
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
                `
              )
            : html`<mwc-list-item>No agents match the filter</mwc-list-item>`}
        </mwc-menu-surface>
      </div>
    `;
  }

  static get scopedElements() {
    return {
      'ui5-avatar': Avatar,
      'mwc-textfield': TextField,
      'mwc-menu-surface': MenuSurface,
      'mwc-list': List,
      'mwc-list-item': ListItem,
    };
  }
}
