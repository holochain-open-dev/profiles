/**
 * Setups the given element with the ApolloClient dependency
 * The result is ready to call customElements.define()
 */
export function setupApolloClientElement(element, apolloClient) {
    return class extends element {
        get _apolloClient() {
            return apolloClient;
        }
    };
}
export function dateString(timestamp) {
    return `${new Date(timestamp * 1000).toLocaleTimeString()}h,
          ${new Date(timestamp * 1000).toDateString()}`;
}
//# sourceMappingURL=utils.js.map