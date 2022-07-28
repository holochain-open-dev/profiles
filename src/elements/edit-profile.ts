import { contextProvided } from '@lit-labs/context';
import { Dictionary } from '@holochain-open-dev/core-types';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import {
  Button,
  Fab,
  IconButton,
  TextField,
} from '@scoped-elements/material-web';
import { SlAvatar } from '@scoped-elements/shoelace';
import { html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { localized, msg, str } from '@lit/localize';

import { ProfilesStore } from '../profiles-store';
import { profilesStoreContext } from '../context';
import { Profile } from '../types';
import { resizeAndExport } from './utils/image';
import { sharedStyles } from './utils/shared-styles';

/**
 * @element edit-profile
 * @fires save-profile - Fired when the save profile button is clicked
 */
@localized()
export class EditProfile extends ScopedElementsMixin(LitElement) {
  /**
   * The profile to be edited.
   */
  @property({ type: Object })
  profile: Profile | undefined;

  /**
   * Label for the save profile button.
   */
  @property({ type: String, attribute: 'save-profile-label' })
  saveProfileLabel: string | undefined;

  /** Dependencies */

  /**
   * `ProfilesStore` that is requested via context.
   * Only set this property if you want to override the store requested via context.
   */
  @contextProvided({ context: profilesStoreContext, subscribe: true })
  @property({ type: Object })
  store!: ProfilesStore;

  /** Private properties */

  @query('#nickname-field')
  private _nicknameField!: TextField;

  private _existingUsernames: { [key: string]: boolean } = {};

  @query('#avatar-file-picker')
  private _avatarFilePicker!: HTMLInputElement;

  @state()
  private _avatar: string | undefined;

  firstUpdated() {
    this._avatar = this.profile?.fields['avatar'];

    this._nicknameField.validityTransform = (newValue: string) => {
      this.requestUpdate();
      if (newValue.length < this.store.config.minNicknameLength) {
        this._nicknameField.setCustomValidity(msg(`Nickname is too short`));
        return {
          valid: false,
        };
      } else if (this._existingUsernames[newValue]) {
        this._nicknameField.setCustomValidity(
          msg('This nickname already exists')
        );
        return { valid: false };
      }

      return {
        valid: true,
      };
    };
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
    return (
      this.store.config.avatarMode === 'avatar-required' ||
      this.store.config.avatarMode === 'avatar-optional'
    );
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
                  >${msg('Clear')}</span
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

  shouldSaveButtonBeEnabled() {
    if (!this._nicknameField) return false;
    if (!this._nicknameField.validity.valid) return false;
    if (this.store.config.avatarMode === 'avatar-required' && !this._avatar)
      return false;
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

  fireSaveProfile() {
    const nickname = this._nicknameField.value;

    const fields: Dictionary<string> = this.getAdditionalFieldsValues();
    if (this._avatar) {
      fields['avatar'] = this._avatar;
    }

    const profile: Profile = {
      fields,
      nickname,
    };

    this.dispatchEvent(
      new CustomEvent('save-profile', {
        detail: {
          profile,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  renderField(fieldName: string) {
    return html`
      <mwc-textfield
        id="profile-field-${fieldName}"
        outlined
        required
        autoValidate
        .validationMessage=${msg('This field is required')}
        .label=${fieldName}
        .value=${this.profile?.fields[fieldName] || ''}
        @input=${() => this.requestUpdate()}
        style="margin-top: 8px;"
      ></mwc-textfield>
    `;
  }

  render() {
    return html`
      ${
        this.avatarMode()
          ? html`<input
              type="file"
              id="avatar-file-picker"
              style="display: none;"
              @change=${this.onAvatarUploaded}
            />`
          : html``
      }
        <div class="column">

          <div class="row" style="justify-content: center; margin-bottom: 8px; align-self: start;" >
            ${this.renderAvatar()}

            <mwc-textfield
              id="nickname-field"
              outlined
              .label=${msg('Nickname')}
              .value=${this.profile?.nickname || ''}
              .helper=${msg(
                str`Min. ${this.store.config.minNicknameLength} characters`
              )}
              @input=${() => this._nicknameField.reportValidity()}
              style="margin-left: 8px;"
            ></mwc-textfield>
          </div>

          ${this.store.config.additionalFields.map(field =>
            this.renderField(field)
          )}

          <mwc-button
            raised
            style="margin-top: 8px;"
            .disabled=${!this.shouldSaveButtonBeEnabled()}
            .label=${this.saveProfileLabel ?? msg('Save Profile')}
            @click=${() => this.fireSaveProfile()}
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
      'mwc-fab': Fab,
      'mwc-icon-button': IconButton,
      'sl-avatar': SlAvatar,
    };
  }

  static styles = [sharedStyles];
}
