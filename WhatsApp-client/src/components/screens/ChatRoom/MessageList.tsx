import React from "react";
import { View, Text, FlatList } from "react-native";

const MessageList = ({ messages = [] }) => {
  return (
    <FlatList
      data={messages}
      inverted
      keyExtractor={(item, index) => item.id}
      ItemSeparatorComponent={() => (
        <View style={{ height: 6, width: "100%" }}></View>
      )}
      renderItem={({ item }) => {
        const isOwner = item.user.email === "user";
        return (
          <View style={{ flex: 1 }}>
            <Text
              style={{
                paddingVertical: 10,
                backgroundColor: isOwner ? "#DCF8C6" : "#ffffff",
                flexShrink: 1,
                alignSelf: isOwner ? "flex-end" : "flex-start",
                paddingHorizontal: 10,
                borderRadius: 8
              }}
            >
              {item.message} {"        "}---from-- {item.user.email}
            </Text>
          </View>
        );
      }}
      //style={{ marginBottom: 56 }}
      contentContainerStyle={{
        //backgroundColor: "green",
        paddingTop: 71,
        paddingBottom: 20,
        paddingHorizontal: 10
      }}
    />
  );
};

export default MessageList;
