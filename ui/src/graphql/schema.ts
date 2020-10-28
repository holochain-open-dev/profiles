import { gql } from '@apollo/client/core';

export const profilesTypeDefs = gql`
  type Agent {
    id: ID!

    profile: Profile
  }

  extend type Query {
    searchProfiles(usernamePrefix: String!): [Agent!]!
    me: Agent!
  }

  extend type Mutation {
    createProfile(username: String!): Agent!
  }

  type Profile {
    username: String!
  }
`;
