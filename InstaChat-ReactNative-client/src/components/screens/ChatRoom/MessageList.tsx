import React from "react";
import { View, Text, FlatList } from "react-native";
import moment from "moment";
import styles from "./MessageList.styles";

const MessageList = ({ messages = [], loggedinUser }) => {
  return (
    <FlatList
      data={messages}
      inverted
      keyExtractor={(item, index) => item.id}
      ItemSeparatorComponent={() => <View style={styles.itemSeparater}></View>}
      renderItem={({ item }) => {
        const isOwner = item.user.id === loggedinUser.id;
        return (
          <View
            style={[
              {
                backgroundColor: isOwner ? "#DCF8C6" : "#ffffff",
                alignSelf: isOwner ? "flex-end" : "flex-start",
                paddingTop: isOwner ? 10 : 2
              },
              styles.messageContainer
            ]}
          >
            {!isOwner && <Text style={styles.username}>{item.user.email}</Text>}
            <Text>{item.message}</Text>
            <Text style={styles.time}>
              {moment(item?.createdAt).format("hh:mm a")}
            </Text>
          </View>
        );
      }}
      contentContainerStyle={styles.listContentContainerStyle}
    />
  );
};

export default MessageList;
