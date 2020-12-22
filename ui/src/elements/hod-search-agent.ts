import { css, html, query, property } from 'lit-element';

import { ComboBoxLightElement } from '@vaadin/vaadin-combo-box/vaadin-combo-box-light';
import type {
  ComboBoxElement,
  ComboBoxItemModel,
} from '@vaadin/vaadin-combo-box';
import { TextField } from 'scoped-material-components/mwc-textfield';
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

  _searchedAgents: Array<AgentProfile> = [];

  _lastSearchedPrefix: string | undefined = undefined;

  @query('#combo-box')
  _comboBox!: ComboBoxElement;

  @query('#textfield')
  _textField!: TextField;

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

  async searchAgents(nicknamePrefix: string): Promise<Array<AgentProfile>> {
    this._searchedAgents = await this._profilesService.searchProfiles(
      nicknamePrefix
    );

    return this._searchedAgents;
  }

  firstUpdated() {
    this._comboBox.dataProvider = async (params, callback) => {
      const nicknamePrefix = params.filter;

      if (nicknamePrefix.length < 3) return callback([], 0);

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

    this._comboBox.renderer = (
      root: HTMLElement,
      comboBox: ComboBoxElement,
      model: ComboBoxItemModel
    ) => {
      const profile: Profile = this._searchedAgents.find(
        agent => agent.profile.nickname === model.item
      )?.profile as Profile;
      root.innerHTML = `
      <div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start;">
        <ui5-avatar 
          image="${profile.fields.avatar}"
          size="XS"
        ></ui5-avatar>
        <span
          style="margin-left: 8px;" 
        >${profile.nickname}</span>
      </div>`;
    };
  }

  onUsernameSelected(e: CustomEvent) {
    const nickname = e.detail.value;

    const agent = this._searchedAgents.find(
      agent => agent.profile.nickname === nickname
    );

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
        this._comboBox._clear();
      }
    }
  }

  render() {
    return html`
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
      'ui5-avatar': Avatar,
      'mwc-textfield': TextField,
      'vaadin-combo-box-light': ComboBoxLightElement,
    };
  }
}
