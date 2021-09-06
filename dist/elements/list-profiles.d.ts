import { LitElement } from 'lit';
import { CircularProgress, ListItem, List } from '@scoped-elements/material-web';
import { ProfilesStore } from '../profiles-store';
import { HoloIdenticon } from './holo-identicon';
import { Dictionary } from '@holochain-open-dev/core-types';
import { Profile } from '../types';
declare const ListProfiles_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
export declare class ListProfiles extends ListProfiles_base {
    /** Dependencies */
    _store: ProfilesStore;
    /** Private properties */
    _loading: boolean;
    _allProfiles: Dictionary<Profile>;
    firstUpdated(): Promise<void>;
    initials(nickname: string): string;
    render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
    static get scopedElements(): {
        'holo-identicon': typeof HoloIdenticon;
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
    };
}
export {};
