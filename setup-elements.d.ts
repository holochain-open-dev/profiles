import { ApolloClient } from '@apollo/client/core';
export declare function setupProfileElements(dependencies: {
    apolloClient: ApolloClient<any>;
}): {
    'hod-create-profile-form': {
        new (): HTMLElement;
        prototype: HTMLElement;
    };
    'hod-profile-prompt': {
        new (): HTMLElement;
        prototype: HTMLElement;
    };
    'hod-search-agent': {
        new (): HTMLElement;
        prototype: HTMLElement;
    };
};
