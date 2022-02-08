import { Dictionary } from '@holochain-open-dev/core-types';
import { Button, Fab, IconButton, TextField } from '@scoped-elements/material-web';
import { SlAvatar } from '@scoped-elements/shoelace';
import { LitElement } from 'lit';
import { ProfilesStore } from '../profiles-store';
import { Profile } from '../types';
declare const EditProfile_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
/**
 * @element edit-profile
 * @fires save-profile - Fired when the save profile button is clicked
 */
export declare class EditProfile extends EditProfile_base {
    /**
     * The profile to be edited.
     */
    profile: Profile | undefined;
    /**
     * Label for the save profile button.
     */
    saveProfileLabel: string;
    /** Dependencies */
    /**
     * `ProfilesStore` that is requested via context.
     * Only set this property if you want to override the store requested via context.
     */
    store: ProfilesStore;
    /** Private properties */
    private _nicknameField;
    private _existingUsernames;
    private _avatarFilePicker;
    private _avatar;
    firstUpdated(): void;
    onAvatarUploaded(): void;
    avatarMode(): boolean;
    renderAvatar(): import("lit").TemplateResult<1>;
    shouldSaveButtonBeEnabled(): boolean;
    textfieldToFieldId(field: TextField): string;
    getAdditionalFieldsValues(): Dictionary<string>;
    getAdditionalTextFields(): Dictionary<TextField>;
    fireSaveProfile(): void;
    renderField(fieldName: string): import("lit").TemplateResult<1>;
    render(): import("lit").TemplateResult<1>;
    /**
     * @ignore
     */
    static get scopedElements(): {
        'mwc-textfield': typeof TextField;
        'mwc-button': typeof Button;
        'mwc-fab': typeof Fab;
        'mwc-icon-button': typeof IconButton;
        'sl-avatar': typeof SlAvatar;
    };
    static styles: import("lit").CSSResult[];
}
export {};
