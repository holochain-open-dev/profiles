import { gql, ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { AppWebsocket } from '@holochain/conductor-api';

import { profilesResolvers, profilesTypeDefs } from '../../dist';
import { AppWebsocketMock, DnaMock } from 'holochain-ui-test-utils';
import { ProfilesMock } from './profiles.mock';

const rootTypeDef = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export const allTypeDefs = [rootTypeDef, profilesTypeDefs];

const dnaMock = new DnaMock({
  profiles: new ProfilesMock(),
});
export async function getAppWebsocket() {
  if (process.env.CONDUCTOR_URL)
    return AppWebsocket.connect(process.env.CONDUCTOR_URL);
  else {
    return new AppWebsocketMock([dnaMock]);
  }
}

/**
 * If process.env.CONDUCTOR_URL is undefined, it will mock the backend
 * If process.env.CONDUCTOR_URL is defined, it will try to connect to holochain at ws://localhost:8888
 */
export async function setupApolloClientMock() {
  const appWebsocket = await getAppWebsocket();

  const appInfo = await appWebsocket.appInfo({ app_id: 'test-app' });

  const cellId = appInfo.cell_data[0][0];

  const executableSchema = makeExecutableSchema({
    typeDefs: allTypeDefs,
    resolvers: [profilesResolvers(appWebsocket, cellId)],
  });

  const schemaLink = new SchemaLink({ schema: executableSchema });

  return new ApolloClient({
    typeDefs: allTypeDefs,

    cache: new InMemoryCache(),
    link: schemaLink,
  });
}
