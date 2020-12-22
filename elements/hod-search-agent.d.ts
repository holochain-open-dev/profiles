import { TextField } from 'scoped-material-components/mwc-textfield';
import { MenuSurface } from 'scoped-material-components/mwc-menu-surface';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { AgentProfile } from '../types';
import { BaseElement } from './base-element';
/**
 * @element hod-search-agent
 * @fires agent-selected - Fired when the user selects some agent. `event.detail.agent` will contain the agent selected
 */
export declare class HodSearchAgent extends BaseElement {
    /** Public attributes */
    /**
     * Whether to clear the field when an agent is selected
     * @attr clear-on-select
     */
    clearOnSelect: boolean;
    /**
     * Label for the agent searching field
     * @attr field-label
     */
    fieldLabel: string;
    /** Private properties */
    _searchedAgents: Array<AgentProfile>;
    get _filteredAgents(): Array<AgentProfile>;
    _currentFilter: string | undefined;
    _lastSearchedPrefix: string | undefined;
    _textField: TextField;
    _overlay: MenuSurface;
    static get styles(): import("lit-element").CSSResult[];
    firstUpdated(): void;
    searchAgents(nicknamePrefix: string): Promise<Array<AgentProfile>>;
    onFilterChange(): void;
    onUsernameSelected(e: CustomEvent): void;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'ui5-avatar': any;
        'mwc-textfield': typeof TextField;
        'mwc-menu-surface': typeof MenuSurface;
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
    };
}
