import { ComboBoxLightElement } from '@vaadin/vaadin-combo-box/vaadin-combo-box-light';
import type { ComboBoxElement } from '@vaadin/vaadin-combo-box';
import { TextField } from 'scoped-material-components/mwc-textfield';
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
    _lastSearchedPrefix: string | undefined;
    _comboBox: ComboBoxElement;
    _textField: TextField;
    static get styles(): import("lit-element").CSSResult[];
    searchAgents(nicknamePrefix: string): Promise<Array<AgentProfile>>;
    firstUpdated(): void;
    onUsernameSelected(e: CustomEvent): void;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'ui5-avatar': any;
        'mwc-textfield': typeof TextField;
        'vaadin-combo-box-light': typeof ComboBoxLightElement;
    };
}
