import { css, html, LitElement } from 'lit';
import { property, state, query } from 'lit/decorators.js';

import {
  MenuSurface,
  List,
  ListItem,
  TextField,
} from '@scoped-elements/material-web';
import { ContextConsumer, contextProvided } from '@lit-labs/context';
import { StoreController, contextStore } from 'lit-svelte-stores';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { Dictionary } from '@holochain-open-dev/core-types';

import { AgentProfile, Profile } from '../types';
import { sharedStyles } from './utils/shared-styles';
import { ProfilesStore } from '../profiles-store';
import { HoloIdenticon } from './holo-identicon';
import { profilesStoreContext } from '../context';

/**
 * @element search-agent
 * @fires agent-selected - Fired when the user selects some agent. `event.detail.agent` will contain the agent selected
 */
export class SearchAgent extends ScopedElementsMixin(LitElement) {
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

  /** Dependencies */

  @contextProvided({ context: profilesStoreContext })
  _profilesStore!: ProfilesStore;

  /** Private properties */

  @contextStore({
    context: profilesStoreContext,
    selectStore: s => s.knownProfiles,
  })
  _knownProfiles!: Dictionary<Profile>;

  get _filteredAgents(): Array<AgentProfile> {
    let filtered = Object.entries(this._knownProfiles)
      .filter(([agentPubKey, profile]) =>
        profile.nickname.startsWith(this._currentFilter as string)
      )
      .map(([agent_pub_key, profile]) => ({ agent_pub_key, profile }));
    if (!this.includeMyself) {
      filtered = filtered.filter(
        agent => this._profilesStore.myAgentPubKey !== agent.agent_pub_key
      );
    }

    return filtered;
  }

  @state()
  _currentFilter: string | undefined = undefined;

  _lastSearchedPrefix: string | undefined = undefined;

  @query('#textfield')
  _textField!: TextField;
  @query('#overlay')
  _overlay!: MenuSurface;

  firstUpdated() {
    this.addEventListener('blur', () => this._overlay.close());
  }

  async searchAgents(nicknamePrefix: string): Promise<void> {
    this._lastSearchedPrefix = nicknamePrefix;
    await this._profilesStore.searchProfiles(nicknamePrefix);
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
        this._currentFilter = undefined;
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
                  <mwc-list style="min-width: 80px;">
                    <mwc-list-item
                      graphic="avatar"
                      .value=${agent.agent_pub_key}
                      style="--mdc-list-item-graphic-size: 32px;"
                      @request-selected=${() => this.onUsernameSelected(agent)}
                    >
                      <holo-identicon
                        slot="graphic"
                        .hash=${agent.agent_pub_key}
                      ></holo-identicon>
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

  static get scopedElements() {
    return {
      'holo-identicon': HoloIdenticon,
      'mwc-textfield': TextField,
      'mwc-menu-surface': MenuSurface,
      'mwc-list': List,
      'mwc-list-item': ListItem,
    };
  }
}
