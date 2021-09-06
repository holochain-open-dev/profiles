import { LitElement } from 'lit';
import { TextField, Button, Card, Ripple, Icon } from '@scoped-elements/material-web';
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
    firstUpdated(): void;
    static get styles(): import("lit").CSSResult;
    createProfile(): Promise<void>;
    render(): import("lit").TemplateResult<1>;
    static get scopedElements(): {
        'mwc-textfield': typeof TextField;
        'mwc-button': typeof Button;
        'mwc-icon': typeof Icon;
        'mwc-card': typeof Card;
        'mwc-ripple': typeof Ripple;
    };
}
export {};
