import { LitElement } from 'lit-element';
import { ApolloClient } from '@apollo/client/core';
import '@material/mwc-textfield';
import '@material/mwc-circular-progress';
import '@material/mwc-button';
import { Agent } from '../types';
/**
 * @element hod-profile-prompt
 */
export declare abstract class HodProfilePrompt extends LitElement {
    /** Public attributes */
    /** Dependencies */
    abstract get _apolloClient(): ApolloClient<any>;
    /** Private properties */
    _myProfile: Agent | undefined;
    static get styles(): import("lit-element").CSSResult[];
    firstUpdated(): Promise<void>;
    agentHasCreatedProfile(): boolean | undefined;
    onProfileCreated(e: CustomEvent): void;
    renderPrompt(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
}
