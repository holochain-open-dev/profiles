import { gql } from '@apollo/client/core';

export const CREATE_PROFILE = gql`
  mutation CreateProfile($username: String!) {
    createProfile(username: $username) {
      id

      profile {
        username
      }
    }
  }
`;

export const GET_ALL_AGENTS = gql`
  query GetAllAgents {
    allAgents {
      id 

      profile {
        username
      }
    }
  }
`;

export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    me {
      id
      
      profile {
        username
      }
    }
  }
`;
