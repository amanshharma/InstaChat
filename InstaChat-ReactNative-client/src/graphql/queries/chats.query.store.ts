import gql from "graphql-tag";

export default gql`
  query GetChats() {
    getChats(chatIds: $chatIds) {
      id
      name
      friends {
        id
      }
    }
  }
`;
