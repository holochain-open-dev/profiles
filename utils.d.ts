import { ApolloClient } from '@apollo/client/core';
/**
 * Setups the given element with the ApolloClient dependency
 * The result is ready to call customElements.define()
 */
export declare function setupApolloClientElement(element: any, apolloClient: ApolloClient<any>): typeof HTMLElement;
export declare function dateString(timestamp: number): string;
