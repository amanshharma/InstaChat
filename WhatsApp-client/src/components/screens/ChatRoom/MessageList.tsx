import React from "react";
import { View, Text, FlatList } from "react-native";

const MessageList = ({ messages = [] }) => {
  console.log("messages --", messages);
  return (
    <FlatList
      data={messages}
      keyExtractor={(item, index) => item.id}
      renderItem={({ item: message }) => <Text>{message.content}</Text>}
    />
  );
};

export default MessageList;
