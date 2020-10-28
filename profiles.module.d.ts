import { ApolloClient } from '@apollo/client/core';
export declare class ProfilesModule {
    protected dependencies: {
        apolloClient: ApolloClient<any>;
    };
    constructor(dependencies: {
        apolloClient: ApolloClient<any>;
    });
    install(): Promise<void>;
    static isInstalled(): boolean;
}
