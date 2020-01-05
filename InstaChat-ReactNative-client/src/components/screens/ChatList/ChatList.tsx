import React, { useMemo, useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Actions } from "react-native-router-flux";
import ListItem from "../../commons/ListItem";
import TopNavBar from "../../headers/TopNavBar";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import getChatsQuery from "../../../graphql/queries/chats.query";
import createChatMutation from "../../../graphql/mutations/createChat.mutation";

import styles from "./ChatList.styles";

const ChatList = ({ user }) => {
  const chatIds = [];
  user?.chats.map(item => {
    chatIds.push(item.id);
  });
  const { loading, error, data } = useQuery<any>(getChatsQuery, {
    variables: {
      chatIds
    }
  });

  const { createChat } = useMutation(createChatMutation);
  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.wrapper}>
      <TopNavBar
        renderLeft={() => (
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <AntDesign
                name="arrowleft"
                size={24}
                style={styles.arrowLeft}
                color="white"
              />
            </TouchableOpacity>
            <Text style={styles.title}>InstaChat</Text>
          </View>
        )}
        renderRight={() => (
          <View style={styles.navRightContent}>
            <Text style={styles.loggedUsernameText}>{user?.email}</Text>
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
      <View style={styles.topBarContainer}>
        <TouchableOpacity>
          <Text style={styles.headerText}>All Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createChatButtonContainer}
          onPress={() => Actions.createChat({ chatIds, loggedinUser: user })}
        >
          <Text style={styles.headerText}>Create New Chat</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={!!data ? data.getChats : []}
        style={styles.chatListStyle}
        renderItem={({ item }) => {
          return (
            <ListItem
              title={item?.name}
              subTitle={`${item?.friends.length - 1} ${
                item?.friends.length - 1 === 1 ? "Member" : "Members"
              }`}
              image={item.picture}
              isGroupChat={item?.friends.length > 2}
              onPress={() =>
                Actions.chatroom({ chat: item, loggedinUser: user })
              }
            />
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ChatList;
