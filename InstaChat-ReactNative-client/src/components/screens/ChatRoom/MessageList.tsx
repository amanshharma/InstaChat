import React from "react";
import { View, Text, FlatList } from "react-native";
import moment from "moment";

const MessageList = ({ messages = [], loggedinUser }) => {
  return (
    <FlatList
      data={messages}
      inverted
      keyExtractor={(item, index) => item.id}
      ItemSeparatorComponent={() => (
        <View style={{ height: 6, width: "100%" }}></View>
      )}
      renderItem={({ item }) => {
        const isOwner = item.user.id === loggedinUser.id;
        return (
          <View
            style={{
              backgroundColor: isOwner ? "#DCF8C6" : "#ffffff",
              flex: 1,
              alignSelf: isOwner ? "flex-end" : "flex-start",
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingBottom: 2,
              paddingTop: isOwner ? 10 : 2
            }}
          >
            {!isOwner && (
              <Text style={{ color: "purple", fontWeight: "bold" }}>
                {item.user.email}
              </Text>
            )}
            <Text>{item.message}</Text>
            <Text style={{ fontSize: 10, opacity: 0.6, alignSelf: "flex-end" }}>
              {moment(item?.createdAt).format("hh:mm a")}
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
