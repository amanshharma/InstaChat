import React, { useMemo, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import { Actions } from "react-native-router-flux";
import ListItem from "../../commons/ListItem";
import TopNavBar from "../../headers/TopNavBar";
import styles from "./ChatList.styles";
import { Ionicons, Entypo } from "@expo/vector-icons";
import getChatsQuery from "../../../graphql/queries/chats.query";

const ChatList = ({ user }) => {
  const chatIds = [];
  user?.chats.map(item => {
    chatIds.push(item.id);
  });
  console.log(chatIds);
  const { loading, error, data } = useQuery<any>(getChatsQuery, {
    variables: {
      chatIds
    }
  });
  console.log("loading", loading, error);
  console.log("DATA", data);
  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  console.log("data", data);
  console.log("error", error);

  return (
    <View style={styles.wrapper}>
      <TopNavBar
        renderLeft={() => <Text style={styles.title}>InstaChat</Text>}
        renderRight={() => (
          <View style={styles.navRightContent}>
            <Text style={{ color: "#ffffff", marginRight: 8, fontSize: 18 }}>
              {user?.email}
            </Text>
            <Ionicons
              name="md-search"
              size={24}
              color="white"
              style={styles.icon}
            />
            <Entypo
              name="dots-three-vertical"
              size={24}
              color="white"
              style={styles.icon}
            />
          </View>
        )}
      />
      <FlatList
        data={!!data ? data.getChats : []}
        renderItem={({ item }) => (
          <ListItem
            title={item?.name}
            subTitle={item?.lastMessage?.content}
            image={item.picture}
            timeStamp={moment(item?.lastMessage?.createdAt).format("HH:mm")}
            onPress={() => Actions.chatroom({ chatId: item.id })}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ChatList;
