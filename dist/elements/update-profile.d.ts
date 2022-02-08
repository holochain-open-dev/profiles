import { LitElement } from 'lit';
import { Card, CircularProgress } from '@scoped-elements/material-web';
import { ProfilesStore } from '../profiles-store';
import { EditProfile } from './edit-profile';
import { Profile } from '../types';
declare const UpdateProfile_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
/**
 * @element update-profile
 * @fires profile-updated - Fired after the profile has been created. Detail will have this shape: { profile: { nickname, fields } }
 */
export declare class UpdateProfile extends UpdateProfile_base {
    /** Dependencies */
    /**
     * `ProfilesStore` that is requested via context.
     * Only set this property if you want to override the store requested via context.
     */
    store: ProfilesStore;
    /** Private properties */
    private _loading;
    private _myProfile;
    firstUpdated(): Promise<void>;
    updateProfile(profile: Profile): Promise<void>;
    render(): import("lit").TemplateResult<1>;
    /**
     * @ignore
     */
    static get scopedElements(): {
        'mwc-circular-progress': typeof CircularProgress;
        'edit-profile': typeof EditProfile;
        'mwc-card': typeof Card;
    };
    static get styles(): import("lit").CSSResult[];
}
export {};
