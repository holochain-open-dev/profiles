import { gql } from '@apollo/client/core';
export const profilesTypeDefs = gql `
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
  }

  input ProfileInput {
    username: String!
  }

  extend type Mutation {
    createProfile(profile: ProfileInput!): Agent!
  }
`;
//# sourceMappingURL=schema.js.map