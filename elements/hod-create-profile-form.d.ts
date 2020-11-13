import { LitElement } from 'lit-element';
import { ApolloClient } from '@apollo/client/core';
import type { TextField } from '@material/mwc-textfield';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@spectrum-web-components/avatar/sp-avatar.js';
/**
 * @element hod-create-profile-form
 * @fires profile-created - after the profile has been created
 */
export declare abstract class HodCreateProfileForm extends LitElement {
    /** Public attributes */
    /**
     * Minimum length that the username needs to have
     * @attr min-length
     */
    minLength: number;
    /** Dependencies */
    abstract get _apolloClient(): ApolloClient<any>;
    /** Private properties */
    _usernameField: TextField;
    _avatarFilePicker: HTMLInputElement;
    _existingUsernames: {
        [key: string]: boolean;
    };
    _avatar: string | undefined;
    firstUpdated(): void;
    static get styles(): import("lit-element").CSSResult;
    createProfile(): Promise<void>;
    cropPlusExport(img: HTMLImageElement, cropX: number, cropY: number, cropWidth: number, cropHeight: number): string;
    onAvatarUploaded(): void;
    render(): import("lit-element").TemplateResult;
}
