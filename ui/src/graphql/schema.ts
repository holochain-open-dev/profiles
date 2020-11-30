import { gql } from '@apollo/client/core';

export const profilesTypeDefs = gql`
  extend type Agent {
    profile: Profile
  }

  extend type Query {
    profilesSearch(usernamePrefix: String!): [Agent!]!
  }

  type Profile {
    username: String!

    avatar: String
  }

  input ProfileParams {
    username: String!

    avatar: String
  }

  extend type Mutation {
    createProfile(profile: ProfileParams!): Agent!
  }
`;
