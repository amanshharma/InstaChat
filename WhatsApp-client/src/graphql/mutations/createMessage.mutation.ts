import gql from "graphql-tag";
export default gql`
  mutation AddMessage($id: ID!, $message: String!) {
    addMessage(id: $id, message: $message) {
      id
      message
      user {
        email
      }
    }
  }
`;
