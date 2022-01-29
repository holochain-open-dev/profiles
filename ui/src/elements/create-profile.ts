import { html, LitElement } from 'lit';
import { query, property, state } from 'lit/decorators.js';
import { contextProvided } from '@holochain-open-dev/context';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { Dictionary } from '@holochain-open-dev/core-types';
import {
  TextField,
  Button,
  Card,
  IconButton,
  Fab,
} from '@scoped-elements/material-web';
import { SlAvatar } from '@scoped-elements/shoelace';

import { sharedStyles } from './utils/shared-styles';
import { ProfilesStore } from '../profiles-store';
import { profilesStoreContext } from '../context';
import { resizeAndExport } from './utils/image';

/**
 * A custom element that fires event on value change.
 *
 * @element create-profile
 * @fires profile-created - Fired after the profile has been created. Detail will have this shape: { profile: { nickname, fields } }
 */
export class CreateProfile extends ScopedElementsMixin(LitElement) {
  /** Public attributes */

  /**
   * Minimum length that the nickname needs to have in order to be valid.
   * @attr min-length
   */
  @property({ type: Number, attribute: 'min-length' })
  minLength = 3;

  /** Dependencies */

  /**
   * `ProfilesStore` that is requested via context.
   * Only set this property if you want to override the store requested via context.
   */
  @contextProvided({ context: profilesStoreContext })
  @property({ type: Object })
  store!: ProfilesStore;

  /** Private properties */

  @query('#nickname-field')
  private _nicknameField!: TextField;

  private _existingUsernames: { [key: string]: boolean } = {};

  @query('#avatar-file-picker')
  private _avatarFilePicker!: HTMLInputElement;

  @state()
  private _avatar: string | undefined = undefined;

  firstUpdated() {
    this._nicknameField.validityTransform = (newValue: string) => {
      this.requestUpdate();
      if (newValue.length < this.minLength) {
        this._nicknameField.setCustomValidity(`Username is too short`);
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

  async createProfile() {
    const nickname = this._nicknameField.value;

    try {
      const fields: Dictionary<string> = this.getAdditionalFieldsValues();
      if (this._avatar) {
        fields['avatar'] = this._avatar;
      }
      await this.store.createProfile({
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

  onAvatarUploaded() {
    if (this._avatarFilePicker.files && this._avatarFilePicker.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          this._avatar = resizeAndExport(img);
          this._avatarFilePicker.value = '';
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(this._avatarFilePicker.files[0]);
    }
  }

  avatarMode() {
    return this.store.config.avatarMode === 'avatar';
  }

  renderAvatar() {
    if (!this.avatarMode()) return html``;
    return html`
      <div
        style="width: 80px; height: 80px; justify-content: center;"
        class="row"
      >
        ${this._avatar
          ? html`
              <div class="column" style="align-items: center; ">
                <sl-avatar
                  image="${this._avatar}"
                  alt="Avatar"
                  style="margin-bottom: 4px; --size: 3.5rem;"
                  initials=""
                ></sl-avatar>
                <span
                  class="placeholder label"
                  style="cursor: pointer;   text-decoration: underline;"
                  @click=${() => (this._avatar = undefined)}
                  >Clear</span
                >
              </div>
            `
          : html` <div class="column" style="align-items: center;">
              <mwc-fab
                icon="add"
                @click=${() => this._avatarFilePicker.click()}
                style="margin-bottom: 4px;"
              ></mwc-fab>
              <span class="placeholder label">Avatar</span>
            </div>`}
      </div>
    `;
  }

  shouldCreateButtonBeEnabled() {
    if (!this._nicknameField) return false;
    if (!this._nicknameField.validity.valid) return false;
    if (this.avatarMode() && !this._avatar) return false;
    if (
      Object.values(this.getAdditionalTextFields()).find(t => !t.validity.valid)
    )
      return false;

    return true;
  }

  textfieldToFieldId(field: TextField): string {
    return field.id.split('-')[2];
  }

  getAdditionalFieldsValues(): Dictionary<string> {
    const textfields = this.getAdditionalTextFields();

    const values: Dictionary<string> = {};
    for (const [id, textfield] of Object.entries(textfields)) {
      values[id] = textfield.value;
    }

    return values;
  }

  getAdditionalTextFields(): Dictionary<TextField> {
    const textfields = Array.from(
      this.shadowRoot!.querySelectorAll('mwc-textfield')
    ).filter(f => f.id !== 'nickname-field') as TextField[];

    const fields: Dictionary<TextField> = {};
    for (const field of textfields) {
      const id = this.textfieldToFieldId(field);
      fields[id] = field;
    }
    return fields;
  }

  renderField(fieldName: string) {
    return html`
      <mwc-textfield
        id="profile-field-${fieldName}"
        outlined
        required
        autoValidate
        .label=${fieldName}
        @input=${() => this.requestUpdate()}
        style="margin-top: 8px;"
      ></mwc-textfield>
    `;
  }

  render() {
    return html`
      ${this.avatarMode()
        ? html`<input
            type="file"
            id="avatar-file-picker"
            style="display: none;"
            @change=${this.onAvatarUploaded}
          />`
        : html``}
      <mwc-card style="width: auto">
        <div class="column" style="margin: 16px;">
          <span
            class="title"
            style="margin-bottom: 24px; align-self: flex-start"
            >Create Profile</span
          >
          <div class="row" style="justify-content: center" ;>
            ${this.renderAvatar()}

            <mwc-textfield
              id="nickname-field"
              outlined
              label="Nickname"
              .helper=${`Min. ${this.minLength} characters`}
              @input=${() => this._nicknameField.reportValidity()}
              style="margin-left: 8px;"
            ></mwc-textfield>
          </div>

          ${this.store.config.additionalFields.map(field =>
            this.renderField(field)
          )}

          <mwc-button
            id="create-profile-button"
            raised
            style="margin-top: 16px;"
            .disabled=${!this.shouldCreateButtonBeEnabled()}
            label="CREATE PROFILE"
            @click=${() => this.createProfile()}
          ></mwc-button>
        </div>
      </mwc-card>
    `;
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      'mwc-textfield': TextField,
      'mwc-button': Button,
      'mwc-card': Card,
      'mwc-icon-button': IconButton,
      'mwc-fab': Fab,
      'sl-avatar': SlAvatar,
    };
  }

  static get styles() {
    return [sharedStyles];
  }
}
