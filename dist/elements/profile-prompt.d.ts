import { LitElement } from 'lit';
import { Button, CircularProgress, TextField } from '@scoped-elements/material-web';
import { CreateProfile } from './create-profile';
import { ProfilesStore } from '../profiles-store';
import { Profile } from '../types';
declare const ProfilePrompt_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
/**
 * @element profile-prompt
 * @slot hero - Will be displayed above the create-profile form when the user is prompted with it
 */
export declare class ProfilePrompt extends ProfilePrompt_base {
    /** Public attributes */
    /** Dependencies */
    /**
     * `ProfilesStore` that is requested via context.
     * Only set this property if you want to override the store requested via context.
     */
    store: ProfilesStore;
    /** Private properties */
    private _myProfileTask;
    renderPrompt(myProfile: Profile | undefined): import("lit-html").TemplateResult<1>;
    render(): unknown;
    /**
     * @ignore
     */
    static get scopedElements(): {
        'mwc-textfield': typeof TextField;
        'mwc-button': typeof Button;
        'mwc-circular-progress': typeof CircularProgress;
        'create-profile': typeof CreateProfile;
    };
    static get styles(): import("lit").CSSResult[];
}
export {};
