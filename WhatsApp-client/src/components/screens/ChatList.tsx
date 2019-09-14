import React, { useMemo, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import ListItem from "../commons/ListItem";

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
  console.log("data", data);
  console.log("error", error);

  return (
    <View>
      <FlatList
        data={data.chats}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subTitle={item.lastMessage.content}
            image={item.picture}
            timeStamp={moment(item.lastMessage.createdAt).format("HH:mm")}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ChatList;
