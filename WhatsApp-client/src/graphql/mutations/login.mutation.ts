import gql from "graphql-tag";

export default gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        email
      }
      token
    }
  }
`;
