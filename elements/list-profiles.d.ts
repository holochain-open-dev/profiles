import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { BaseElement, DepsElement } from '@holochain-open-dev/common';
import { ProfilesStore } from '../profiles.store';
declare const ListProfiles_base: typeof BaseElement;
export declare abstract class ListProfiles extends ListProfiles_base implements DepsElement<ProfilesStore> {
    /** Private properties */
    _loading: boolean;
    static get styles(): import("lit-element").CSSResult[];
    abstract get _deps(): ProfilesStore;
    firstUpdated(): Promise<void>;
    initials(nickname: string): string;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'ui5-avatar': any;
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
    };
}
export {};
