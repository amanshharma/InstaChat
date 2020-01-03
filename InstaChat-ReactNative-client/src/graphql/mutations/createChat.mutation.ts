import gql from "graphql-tag";

export default gql`
  mutation addchat($chatName: String!, $userIds: [ID]!) {
    addChat(chatName: $chatName, userIds: $userIds) {
      id
      name
      friends {
        id
      }
    }
  }
`;
