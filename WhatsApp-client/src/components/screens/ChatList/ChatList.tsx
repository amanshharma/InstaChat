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

const ChatList = () => {
  const getChatsQuery = gql`
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

  const { loading, error, data } = useQuery<any>(getChatsQuery);
  console.log("loading", loading);
  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  //console.log("data", data);
  //console.log("error", error);

  return (
    <View style={styles.wrapper}>
      <TopNavBar
        renderLeft={() => <Text style={styles.title}>WhatsApp</Text>}
        renderRight={() => (
          <View style={styles.navRightContent}>
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
        data={data.chats}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subTitle={item.lastMessage.content}
            image={item.picture}
            timeStamp={moment(item.lastMessage.createdAt).format("HH:mm")}
            onPress={() => Actions.chatroom({ id: item.id })}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ChatList;
