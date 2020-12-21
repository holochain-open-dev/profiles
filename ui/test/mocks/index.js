import { gql, ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import ConductorApi from '@holochain/conductor-api';

import { profilesResolvers, profilesTypeDefs } from '../../dist';
import { AppWebsocketMock, DnaMock } from 'holochain-ui-test-utils';
import { ProfilesMock } from './profiles.mock';
import { commonResolvers, commonTypeDefs } from '@holochain-open-dev/common';

const rootTypeDef = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export const allTypeDefs = [rootTypeDef, commonTypeDefs, profilesTypeDefs];

/**
 * If process.env.CONDUCTOR_URL is undefined, it will mock the backend
 * If process.env.CONDUCTOR_URL is defined, it will try to connect to holochain at that url
 */
const dnaMock = new DnaMock({
  profiles: new ProfilesMock(),
});
export async function getAppWebsocket() {
  if (process.env.CONDUCTOR_URL)
    return ConductorApi.AppWebsocket.connect(process.env.CONDUCTOR_URL);
  else {
    return new AppWebsocketMock([dnaMock]);
  }
}
