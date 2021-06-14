import { MobxLitElement } from '@adobe/lit-mobx';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { Button } from 'scoped-material-components/mwc-button';
import { Card } from 'scoped-material-components/mwc-card';
import { Ripple } from 'scoped-material-components/mwc-ripple';
import { Icon } from 'scoped-material-components/mwc-icon';
import { ProfilesStore } from '../profiles.store';
declare const CreateProfileForm_base: typeof MobxLitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
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
    /** Private properties */
    _nicknameField: TextField;
    _avatarFilePicker: HTMLInputElement;
    _existingUsernames: {
        [key: string]: boolean;
    };
    _avatar: string | undefined;
    _store: ProfilesStore;
    firstUpdated(): void;
    static get styles(): import("lit").CSSResultGroup;
    createProfile(): Promise<void>;
    cropPlusExport(img: HTMLImageElement, cropX: number, cropY: number, cropWidth: number, cropHeight: number): string;
    onAvatarUploaded(): void;
    render(): import("lit-html").TemplateResult<1>;
    static get scopedElements(): {
        'mwc-textfield': typeof TextField;
        'mwc-button': typeof Button;
        'mwc-icon': typeof Icon;
        'mwc-card': typeof Card;
        'mwc-ripple': typeof Ripple;
        'ui5-avatar': any;
    };
}
export {};
