import gql from "graphql-tag";

export default gql`
  subscription MessageAdded($chatId: ID!) {
    message(chatId: $chatId) {
      id
      message
      user {
        email
      }
    }
  }
`;
