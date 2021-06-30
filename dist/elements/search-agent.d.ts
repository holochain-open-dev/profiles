import { TextField } from 'scoped-material-components/mwc-textfield';
import { MenuSurface } from 'scoped-material-components/mwc-menu-surface';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { MobxLitElement } from '@adobe/lit-mobx';
import { AgentProfile } from '../types';
import { ProfilesStore } from '../profiles.store';
import { HoloIdenticon } from './holo-identicon';
declare const SearchAgent_base: typeof MobxLitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
/**
 * @element search-agent
 * @fires agent-selected - Fired when the user selects some agent. `event.detail.agent` will contain the agent selected
 */
export declare class SearchAgent extends SearchAgent_base {
    /** Public attributes */
    /**
     * Whether to clear the field when an agent is selected
     * @attr clear-on-select
     */
    clearOnSelect: boolean;
    /**
     * Whether to include my own agent as a possible agent to select
     * @attr include-myself
     */
    includeMyself: boolean;
    /**
     * Label for the agent searching field
     * @attr field-label
     */
    fieldLabel: string;
    /** Private properties */
    get _filteredAgents(): Array<AgentProfile>;
    _currentFilter: string | undefined;
    _lastSearchedPrefix: string | undefined;
    _textField: TextField;
    _overlay: MenuSurface;
    _store: ProfilesStore;
    firstUpdated(): void;
    searchAgents(nicknamePrefix: string): Promise<void>;
    onFilterChange(): void;
    onUsernameSelected(agent: AgentProfile): void;
    render(): import("lit").TemplateResult<1>;
    static get styles(): import("lit").CSSResultGroup[];
    static get scopedElements(): {
        'holo-identicon': typeof HoloIdenticon;
        'mwc-textfield': typeof TextField;
        'mwc-menu-surface': typeof MenuSurface;
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
    };
}
export {};
