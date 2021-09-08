
import { gql } from '@apollo/client';

// GET Queries

export const GET_USER = gql`
  query GetUsers{
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

export const GET_COMPANIES = gql`
  query GetCompanies{
    companies{
      id,
      name
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id:String!){
    user(id:$id){
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

// POST Queries

export const CREATE_USER = gql`
  mutation AddUser($firstname:String!,$age:Int!,$companyId:String!){
    addUser(firstname:$firstname,age:$age,companyId:$companyId){
      id,
      firstname,
      age
    }
  }
`;

// DELETE Queries

export const DELETE_USER = gql`
  mutation DeleteUser($id:String!){
    deleteUser(id:$id){
      id
    }
  }
`;
