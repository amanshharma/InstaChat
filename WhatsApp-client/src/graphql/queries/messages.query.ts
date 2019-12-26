import gql from "graphql-tag";

export default gql`
  query GetMessages($id: ID!) {
    getMessages(id: $id) {
      id
      message
      user {
        email
      }
    }
  }
`;
