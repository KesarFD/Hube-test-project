import { gql } from '@apollo/client';

export const GET_GLOBAL_SETTINGS = gql`
  query GetGlobalSettings {
    getGlobalSettings {
      id
      name
      value
      description
      type
    }
  }
`;