import { MobxLitElement } from '@adobe/lit-mobx';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { ProfilesStore } from '../profiles.store';
declare const ListProfiles_base: typeof MobxLitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
export declare class ListProfiles extends ListProfiles_base {
    /** Private properties */
    _loading: boolean;
    _store: ProfilesStore;
    firstUpdated(): Promise<void>;
    initials(nickname: string): string;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResultGroup[];
    static get scopedElements(): {
        'ui5-avatar': any;
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
    };
}
export {};
