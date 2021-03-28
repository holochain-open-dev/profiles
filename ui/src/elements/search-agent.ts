import { css, html, query, property } from 'lit-element';

import { TextField } from 'scoped-material-components/mwc-textfield';
import { MenuSurface } from 'scoped-material-components/mwc-menu-surface';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import Avatar from '@ui5/webcomponents/dist/Avatar';
import { BaseElement, DepsElement } from '@holochain-open-dev/common';

import { AgentProfile, Profile } from '../types';
import { sharedStyles } from './utils/shared-styles';
import { ProfilesStore } from '../profiles.store';
import { MobxReactionUpdate } from '@adobe/lit-mobx';

/**
 * @element search-agent
 * @fires agent-selected - Fired when the user selects some agent. `event.detail.agent` will contain the agent selected
 */
export abstract class SearchAgent
  extends MobxReactionUpdate(BaseElement)
  implements DepsElement<ProfilesStore> {
  /** Public attributes */

  /**
   * Whether to clear the field when an agent is selected
   * @attr clear-on-select
   */
  @property({ type: Boolean, attribute: 'clear-on-select' })
  clearOnSelect = false;

  /**
   * Whether to include my own agent as a possible agent to select
   * @attr include-myself
   */
  @property({ type: Boolean, attribute: 'include-myself' })
  includeMyself = false;

  /**
   * Label for the agent searching field
   * @attr field-label
   */
  @property({ type: String, attribute: 'field-label' })
  fieldLabel = 'Search agent';

  /** Private properties */

  get _filteredAgents(): Array<AgentProfile> {
    let filtered = this._deps.knownProfiles.filter(agent =>
      agent.profile.nickname.startsWith(this._currentFilter as string)
    );
    if (!this.includeMyself) {
      filtered = filtered.filter(
        agent => this._deps.myAgentPubKey !== agent.agent_pub_key
      );
    }

    return filtered;
  }

  @property({ type: String })
  _currentFilter: string | undefined = undefined;

  _lastSearchedPrefix: string | undefined = undefined;

  @query('#textfield')
  _textField!: TextField;
  @query('#overlay')
  _overlay!: MenuSurface;

  abstract get _deps(): ProfilesStore;

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

  async searchAgents(nicknamePrefix: string): Promise<void> {
    this._lastSearchedPrefix = nicknamePrefix;
    await this._deps.searchProfiles(nicknamePrefix);
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

  onUsernameSelected(agent: AgentProfile) {
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
            ? this._filteredAgents.map(
                agent => html`
                  <mwc-list
                    @selected=${(e: CustomEvent) =>
                      this.onUsernameSelected(
                        this._filteredAgents[e.detail.index]
                      )}
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

  getScopedElements() {
    return {
      'ui5-avatar': Avatar,
      'mwc-textfield': TextField,
      'mwc-menu-surface': MenuSurface,
      'mwc-list': List,
      'mwc-list-item': ListItem,
    };
  }
}
