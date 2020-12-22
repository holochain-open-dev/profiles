import { TextField } from 'scoped-material-components/mwc-textfield';
import { Button } from 'scoped-material-components/mwc-button';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { BaseElement } from './base-element';
/**
 * @element hod-create-profile-form
 * @fires profile-created - after the profile has been created
 */
export declare class HodCreateProfileForm extends BaseElement {
    /** Public attributes */
    /**
     * Minimum length that the nickname needs to have
     * @attr min-length
     */
    minLength: number;
    /** Private properties */
    _nicknameField: TextField;
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
    static get scopedElements(): {
        'mwc-textfield': typeof TextField;
        'mwc-button': typeof Button;
        'mwc-icon-button': typeof IconButton;
        'ui5-avatar': any;
    };
}
