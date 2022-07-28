import { LitElement } from 'lit';
import { ProfilesStore } from '../profiles-store';
import { ProfileDetail } from './profile-detail';
import { IconButton } from '@scoped-elements/material-web';
import { UpdateProfile } from './update-profile';
declare const MyProfile_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
/**
 * @element profile-detail
 */
export declare class MyProfile extends MyProfile_base {
    /** Dependencies */
    /**
     * `ProfilesStore` that is requested via context.
     * Only set this property if you want to override the store requested via context.
     */
    store: ProfilesStore;
    /** Private properties */
    private _editing;
    render(): import("lit-html").TemplateResult<1>;
    /**
     * @ignore
     */
    static get scopedElements(): {
        'mwc-icon-button': typeof IconButton;
        'profile-detail': typeof ProfileDetail;
        'update-profile': typeof UpdateProfile;
    };
    static styles: import("lit").CSSResult[];
}
export {};
