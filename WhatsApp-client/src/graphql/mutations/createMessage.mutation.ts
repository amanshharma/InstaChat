import gql from "graphql-tag";
export default gql`
  mutation AddMessage($id: ID!, $message: String!, $senderId: ID!) {
    addMessage(id: $id, message: $message, senderId: $senderId) {
      id
      message
      user {
        id
        email
      }
    }
  }
`;
