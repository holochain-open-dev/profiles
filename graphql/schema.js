import { gql } from '@apollo/client/core';
export const profilesTypeDefs = gql `
  extend type HolochainAgent {
    profile: Profile
  }

  extend type Query {
    profilesSearch(usernamePrefix: String!): [HolochainAgent!]!
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
    createProfile(profile: ProfileParams!): HolochainAgent!
  }
`;
//# sourceMappingURL=schema.js.map