import { LitElement } from 'lit';
import { TextField, Button, Card, IconButton, Fab } from '@scoped-elements/material-web';
import { ProfilesStore } from '../profiles-store';
declare const CreateProfileForm_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
/**
 * @element create-profile-form
 * @fires profile-created - after the profile has been created
 */
export declare class CreateProfileForm extends CreateProfileForm_base {
    /** Public attributes */
    /**
     * Minimum length that the nickname needs to have
     * @attr min-length
     */
    minLength: number;
    /** Dependencies */
    _store: ProfilesStore;
    /** Private properties */
    _nicknameField: TextField;
    _existingUsernames: {
        [key: string]: boolean;
    };
    _avatarFilePicker: HTMLInputElement;
    _avatar: string | undefined;
    firstUpdated(): void;
    createProfile(): Promise<void>;
    resizeAndExport(img: HTMLImageElement): string;
    onAvatarUploaded(): void;
    avatarMode(): boolean;
    renderAvatar(): import("lit-html").TemplateResult<1>;
    shouldCreateButtonBeEnabled(): boolean;
    render(): import("lit-html").TemplateResult<1>;
    static get scopedElements(): {
        'mwc-textfield': typeof TextField;
        'mwc-button': typeof Button;
        'mwc-card': typeof Card;
        'mwc-icon-button': typeof IconButton;
        'mwc-fab': typeof Fab;
        'sl-avatar': typeof import("@scoped-elements/shoelace/dist/sl-avatar").SlAvatar;
    };
    static get styles(): import("lit").CSSResult[];
}
export {};
