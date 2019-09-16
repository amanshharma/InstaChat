import gql from "graphql-tag";

export default gql`
  query GetChats {
    chats {
      id
      name
      picture
      lastMessage {
        id
        content
        createdAt
      }
      messages {
        id
        content
        createdAt
      }
    }
  }
`;
