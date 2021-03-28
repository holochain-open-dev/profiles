import { TextField } from 'scoped-material-components/mwc-textfield';
import { Button } from 'scoped-material-components/mwc-button';
import { Card } from 'scoped-material-components/mwc-card';
import { Icon } from 'scoped-material-components/mwc-icon';
import { Ripple } from 'scoped-material-components/mwc-ripple';
import { BaseElement, DepsElement } from '@holochain-open-dev/common';
import { ProfilesStore } from '../profiles.store';
declare const CreateProfileForm_base: typeof BaseElement;
/**
 * @element create-profile-form
 * @fires profile-created - after the profile has been created
 */
export declare abstract class CreateProfileForm extends CreateProfileForm_base implements DepsElement<ProfilesStore> {
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
    abstract get _deps(): ProfilesStore;
    firstUpdated(): void;
    static get styles(): import("lit-element").CSSResult;
    createProfile(): Promise<void>;
    cropPlusExport(img: HTMLImageElement, cropX: number, cropY: number, cropWidth: number, cropHeight: number): string;
    onAvatarUploaded(): void;
    render(): import("lit-element").TemplateResult;
    getScopedElements(): {
        'mwc-textfield': typeof TextField;
        'mwc-button': typeof Button;
        'mwc-icon': typeof Icon;
        'mwc-card': typeof Card;
        'mwc-ripple': typeof Ripple;
        'ui5-avatar': any;
    };
}
export {};
