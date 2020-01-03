import gql from "graphql-tag";

export default gql`
  query GetUsers {
    getUsers {
      id
      email
    }
  }
`;
