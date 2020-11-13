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

  type Profile {
    username: String!

    avatar: String
  }

  input ProfileInput {
    username: String!

    avatar: String
  }

  extend type Mutation {
    createProfile(profile: ProfileInput!): Agent!
  }
`;
