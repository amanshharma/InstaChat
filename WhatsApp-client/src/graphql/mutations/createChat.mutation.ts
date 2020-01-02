import gql from "graphql-tag";

export default gql`
  mutation createChat($chatName: String!, $userIds: [id!]!) {
    createChat(chatName: $chatName, userIds: $userIds) {
      id
      name
      friends {
        id
      }
    }
  }
`;
