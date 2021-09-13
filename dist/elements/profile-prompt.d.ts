import { LitElement } from 'lit';
import { Button, CircularProgress, TextField } from '@scoped-elements/material-web';
import { StoreSubscriber } from 'lit-svelte-stores';
import { CreateProfileForm } from './create-profile-form';
import { ProfilesStore } from '../profiles-store';
import { Profile } from '../types';
declare const ProfilePrompt_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
/**
 * @element profile-prompt
 */
export declare class ProfilePrompt extends ProfilePrompt_base {
    /** Public attributes */
    /** Dependencies */
    _store: ProfilesStore;
    /** Private properties */
    _loading: boolean;
    _myProfile: StoreSubscriber<Profile>;
    firstUpdated(): Promise<void>;
    renderPrompt(): import("lit").TemplateResult<1>;
    render(): import("lit").TemplateResult<1>;
    static get scopedElements(): {
        'mwc-textfield': typeof TextField;
        'mwc-button': typeof Button;
        'mwc-circular-progress': typeof CircularProgress;
        'create-profile-form': typeof CreateProfileForm;
    };
    static get styles(): import("lit").CSSResult[];
}
export {};
