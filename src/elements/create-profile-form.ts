import { html } from 'lit';
import { query, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { requestContext } from '@holochain-open-dev/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { MobxLitElement } from '@adobe/lit-mobx';

import { TextField } from 'scoped-material-components/mwc-textfield';
import { Button } from 'scoped-material-components/mwc-button';
import { Card } from 'scoped-material-components/mwc-card';
import { Ripple } from 'scoped-material-components/mwc-ripple';
import { Icon } from 'scoped-material-components/mwc-icon';

import { sharedStyles } from './utils/shared-styles';
import { Dictionary, PROFILES_STORE_CONTEXT } from '../types';
import { ProfilesStore } from '../profiles.store';

/**
 * @element create-profile-form
 * @fires profile-created - after the profile has been created
 */
export class CreateProfileForm extends ScopedElementsMixin(MobxLitElement) {
  /** Public attributes */

  /**
   * Minimum length that the nickname needs to have
   * @attr min-length
   */
  @property({ type: Number, attribute: 'min-length' })
  minLength = 3;

  /** Private properties */

  @query('#nickname-field')
  _nicknameField!: TextField;

  _existingUsernames: { [key: string]: boolean } = {};

  @requestContext(PROFILES_STORE_CONTEXT)
  _store!: ProfilesStore;

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
