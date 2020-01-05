import gql from "graphql-tag";

export default gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      id
    }
  }
`;
