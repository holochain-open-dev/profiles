import { html, LitElement } from 'lit';
import { query, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { contextProvided } from '@lit-labs/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';

import {
  TextField,
  Button,
  Card,
  Ripple,
  Icon,
} from '@scoped-elements/material-web';

import { sharedStyles } from './utils/shared-styles';
import { ProfilesStore } from '../profiles-store';
import { profilesStoreContext } from '../context';
import { Dictionary } from '@holochain-open-dev/core-types';

/**
 * @element create-profile-form
 * @fires profile-created - after the profile has been created
 */
export class CreateProfileForm extends ScopedElementsMixin(LitElement) {
  /** Public attributes */

  /**
   * Minimum length that the nickname needs to have
   * @attr min-length
   */
  @property({ type: Number, attribute: 'min-length' })
  minLength = 3;
  
  /** Dependencies */

  @contextProvided({ context: profilesStoreContext })
  _store!: ProfilesStore;

  /** Private properties */

  @query('#nickname-field')
  _nicknameField!: TextField;

  _existingUsernames: { [key: string]: boolean } = {};

  firstUpdated() {
    this._nicknameField.validityTransform = (newValue: string) => {
      this.requestUpdate();
      if (newValue.length < this.minLength) {
        this._nicknameField.setCustomValidity(
          `Username is too shot, min. ${this.minLength} characters`
        );
        return {
          valid: false,
        };
      } else if (this._existingUsernames[newValue]) {
        this._nicknameField.setCustomValidity('This nickname already exists');
        return { valid: false };
      }

      return {
        valid: true,
      };
    };
  }

  static get styles() {
    return sharedStyles;
  }

  async createProfile() {
    const nickname = this._nicknameField.value;

    try {
      const fields: Dictionary<string> = {};

      await this._store.createProfile({
        nickname,
        fields,
      });

      this.dispatchEvent(
        new CustomEvent('profile-created', {
          detail: {
            profile: {
              nickname,
              fields,
            },
          },
          bubbles: true,
          composed: true,
        })
      );
    } catch (e) {
      this._existingUsernames[nickname] = true;
      this._nicknameField.reportValidity();
    }
  }

  render() {
    return html`
      <mwc-card style="width: auto">
        <div class="column" style="margin: 16px;">
          <span class="title" style="margin-bottom: 24px;">Create Profile</span>
          <div class="row center-content">
            <mwc-textfield
              id="nickname-field"
              outlined
              label="Nickname"
              @input=${() => this._nicknameField.reportValidity()}
              style="margin-left: 8px;"
            ></mwc-textfield>
          </div>
          <mwc-button
            id="create-profile-button"
            raised
            class=${classMap({
              'small-margin': !!this._nicknameField,
              'big-margin': !this._nicknameField,
            })}
            .disabled=${!this._nicknameField ||
            !this._nicknameField.validity.valid}
            label="CREATE PROFILE"
            @click=${() => this.createProfile()}
          ></mwc-button>
        </div>
      </mwc-card>
    `;
  }

  static get scopedElements() {
    return {
      'mwc-textfield': TextField,
      'mwc-button': Button,
      'mwc-icon': Icon,
      'mwc-card': Card,
      'mwc-ripple': Ripple,
    };
  }
}
