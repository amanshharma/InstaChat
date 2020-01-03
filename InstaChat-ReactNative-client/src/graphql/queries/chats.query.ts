import gql from "graphql-tag";

export default gql`
  query GetChats($chatIds: [ID!]) {
    getChats(chatIds: $chatIds) {
      id
      name
      friends {
        id
      }
    }
  }
`;
