import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { Resolvers } from '@apollo/client/core';
export declare function profilesResolvers(appWebsocket: AppWebsocket, cellId: CellId, zomeName?: string): Resolvers;
