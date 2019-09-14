import React, { useMemo, useEffect } from "react";
import { View, Text } from "react-native";
import gql from "graphql-tag";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import axios from "axios";

import { SafeAreaView } from "react-native-safe-area-view";

const ChatList = () => {
  const getChatsQuery = gql`
    query GetChats {
      chats {
        id
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
      <Text>Awesome</Text>
    </View>
  );
};

export default ChatList;
