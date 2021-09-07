
import { gql } from '@apollo/client';

export const GET_USER = gql`
  {
    users{
      id,
      firstname,
      age,
      company{
        id,
        name,
        description
      }
    }
  }
`;

