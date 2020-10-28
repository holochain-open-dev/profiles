import { LitElement } from 'lit-element';
import { ApolloClient } from '@apollo/client/core';
import type { TextField } from '@material/mwc-textfield';
import '@material/mwc-textfield';
import '@material/mwc-button';
/**
 * @element hod-create-profile-form
 * @fires profile-created - after the profile has been created
 */
export declare abstract class HodCreateProfileForm extends LitElement {
    /** Public attributes */
    /**
     * Minimum length that the username needs to have
     * @attr min-length
     */
    minLength: number;
    /** Dependencies */
    abstract get _apolloClient(): ApolloClient<any>;
    /** Private properties */
    _usernameField: TextField;
    _existingUsernames: {
        [key: string]: boolean;
    };
    firstUpdated(): void;
    static get styles(): import("lit-element").CSSResult;
    createProfile(): Promise<void>;
    render(): import("lit-element").TemplateResult;
}
