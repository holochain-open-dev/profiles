import { LitElement } from 'lit';
import { Card } from '@scoped-elements/material-web';
import { ProfilesStore } from '../profiles-store';
import { EditProfile } from './edit-profile';
import { Profile } from '../types';
declare const CreateProfile_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
/**
 * A custom element that fires event on value change.
 *
 * @element create-profile
 * @fires profile-created - Fired after the profile has been created. Detail will have this shape: { profile: { nickname, fields } }
 */
export declare class CreateProfile extends CreateProfile_base {
    /** Dependencies */
    /**
     * `ProfilesStore` that is requested via context.
     * Only set this property if you want to override the store requested via context.
     */
    store: ProfilesStore;
    /** Private properties */
    createProfile(profile: Profile): Promise<void>;
    render(): import("lit").TemplateResult<1>;
    /**
     * @ignore
     */
    static get scopedElements(): {
        'edit-profile': typeof EditProfile;
        'mwc-card': typeof Card;
    };
    static get styles(): import("lit").CSSResult[];
}
export {};
