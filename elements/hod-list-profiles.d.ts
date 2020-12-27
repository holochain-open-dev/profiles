import { PropertyValues } from 'lit-element';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { AgentProfile } from '../types';
import { BaseElement } from './base-element';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
export declare class HodListProfiles extends BaseElement {
    /** Private properties */
    _allProfiles: Array<AgentProfile> | undefined;
    static get styles(): import("lit-element").CSSResult[];
    updated(changedValues: PropertyValues): void;
    loadAgents(): Promise<void>;
    initials(nickname: string): string;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'ui5-avatar': any;
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
    };
}
