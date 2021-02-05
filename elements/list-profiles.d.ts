import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { BaseElement } from './utils/base-element';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
export declare abstract class ListProfiles extends BaseElement {
    /** Private properties */
    _loading: boolean;
    static get styles(): import("lit-element").CSSResult[];
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
