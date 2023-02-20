import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import {
  MdFilledButton,
  MdOutlinedButton,
  MdFab,
  MdStandardIconButton,
  MdOutlinedTextField,
  Card,
} from "@scoped-elements/material-web";
import { SlAvatar } from "@scoped-elements/shoelace";
import { html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
import { localized, msg, str } from "@lit/localize";
import { consume } from "@lit-labs/context";

import { ProfilesStore } from "../profiles-store";
import { profilesStoreContext } from "../context";
import { Profile } from "../types";
import { resizeAndExport } from "./utils/image";
import { sharedStyles } from "@holochain-open-dev/elements";

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
  @property({ type: String, attribute: "save-profile-label" })
  saveProfileLabel: string | undefined;

  /** Dependencies */

  /**
   * @internal
   */
  @consume({ context: profilesStoreContext, subscribe: true })
  @state()
  _store!: ProfilesStore;

  @property({ type: Boolean })
  allowCancel = false;

  /** Private properties */

  /**
   * @internal
   */
  @query("#nickname-field")
  private _nicknameField!: MdOutlinedTextField;

  /**
   * @internal
   */
  @query("#avatar-file-picker")
  private _avatarFilePicker!: HTMLInputElement;

  /**
   * @internal
   */
  @state()
  private _avatar: string | undefined;

  firstUpdated() {
    this._avatar = this.profile?.fields["avatar"];
    // TODO: figure out why this is necessary to enable the update profile button and fix it
    setTimeout(() => this.requestUpdate());
  }

  onAvatarUploaded() {
    if (this._avatarFilePicker.files && this._avatarFilePicker.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          this._avatar = resizeAndExport(img);
          this._avatarFilePicker.value = "";
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(this._avatarFilePicker.files[0]);
    }
  }

  avatarMode() {
    return (
      this._store.config.avatarMode === "avatar-required" ||
      this._store.config.avatarMode === "avatar-optional"
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
                  >${msg("Clear")}</span
                >
              </div>
            `
          : html` <div class="column" style="align-items: center;">
              <md-fab
                icon="add"
                @click=${() => this._avatarFilePicker.click()}
                style="margin-bottom: 4px;"
              ></md-fab>
              <span class="placeholder label">${msg("Avatar")}</span>
            </div>`}
      </div>
    `;
  }

  shouldSaveButtonBeEnabled() {
    if (!this._nicknameField) return false;
    if (!(this._nicknameField as any).validity.valid) return false;
    if (this._store.config.avatarMode === "avatar-required" && !this._avatar)
      return false;
    if (
      Object.values(this.getAdditionalTextFields()).find(
        (t) => !(t as any).validity.valid
      )
    )
      return false;

    return true;
  }

  textfieldToFieldId(field: MdOutlinedTextField): string {
    return field.id.split("-")[2];
  }

  getAdditionalFieldsValues(): Record<string, string> {
    const textfields = this.getAdditionalTextFields();

    const values: Record<string, string> = {};
    for (const [id, textfield] of Object.entries(textfields)) {
      values[id] = (textfield as any).value;
    }

    return values;
  }

  getAdditionalTextFields(): Record<string, MdOutlinedTextField> {
    const textfields = Array.from(
      this.shadowRoot!.querySelectorAll("md-outlined-text-field")
    ).filter((f) => f.id !== "nickname-field") as MdOutlinedTextField[];

    const fields: Record<string, MdOutlinedTextField> = {};
    for (const field of textfields) {
      const id = this.textfieldToFieldId(field);
      fields[id] = field;
    }
    return fields;
  }

  fireSaveProfile() {
    const nickname = (this._nicknameField as any).value;

    const fields: Record<string, string> = this.getAdditionalFieldsValues();
    if (this._avatar) {
      fields["avatar"] = this._avatar;
    }

    const profile: Profile = {
      fields,
      nickname,
    };

    this.dispatchEvent(
      new CustomEvent("save-profile", {
        detail: {
          profile,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  fireCancel() {
    this.dispatchEvent(
      new CustomEvent("cancel-edit-profile", {
        bubbles: true,
        composed: true,
      })
    );
  }

  renderField(fieldName: string) {
    return html`
      <md-outlined-text-field
        id="profile-field-${fieldName}"
        required
        .errorText=${msg("This field is required")}
        .label=${fieldName}
        .value=${this.profile?.fields[fieldName] || ""}
        @input=${() => this.requestUpdate()}
        style="margin-bottom: 8px; margin-top: 8px"
      ></md-outlined-text-field>
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
      <div class="column">
        <div class="row" style="justify-content: center; align-self: start;">
          ${this.renderAvatar()}

          <div>
            <md-outlined-text-field
              id="nickname-field"
              .label=${msg("Nickname")}
              required
              .minLength=${this._store.config.minNicknameLength}
              .errorText=${msg("Nickname is too short")}
              .value=${this.profile?.nickname || ""}
              .helper=${msg(
                str`Min. ${this._store.config.minNicknameLength} characters`
              )}
              style="margin-left: 8px;"
            ></md-outlined-text-field>
          </div>
        </div>

        ${this._store.config.additionalFields.map((field) =>
          this.renderField(field)
        )}

        <div class="row" style="margin-top: 8px;">
          ${this.allowCancel
            ? html`
                <md-outlined-button
                  style="flex: 1; margin-right: 6px;"
                  .label=${msg("Cancel")}
                  @click=${() => this.fireCancel()}
                ></md-outlined-button>
              `
            : html``}

          <md-filled-button
            style="flex: 1;"
            .disabled=${!this.shouldSaveButtonBeEnabled()}
            .label=${this.saveProfileLabel ?? msg("Save Profile")}
            @click=${() => this.fireSaveProfile()}
          ></md-filled-button>
        </div>
      </div>
    `;
  }

  /**
   * @ignore
   */
  static get scopedElements() {
    return {
      "md-outlined-text-field": MdOutlinedTextField,
      "md-filled-button": MdFilledButton,
      "md-outlined-button": MdOutlinedButton,
      "md-fab": MdFab,
      "sl-avatar": SlAvatar,
    };
  }

  static styles = [sharedStyles];
}
