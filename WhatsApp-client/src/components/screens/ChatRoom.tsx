import React from "react";
import { View, Text } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const ChatRoom = ({ id }) => {
  const getMessagesQuery = gql`
    query getMessages($chatId: ID!) {
      chat(chatId: $chatId) {
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

  const { loading, error, data } = useQuery(getMessagesQuery, {
    variables: { chatId: id }
  });

  if (!!loading)
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  console.log("ERROR", error);
  console.log("DATA", data);

  return (
    <View>
      <Text>Chatr123oom--{id}</Text>
    </View>
  );
};

export default ChatRoom;
