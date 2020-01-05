import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import gql from "graphql-tag";
import {
  useQuery,
  useApolloClient,
  useMutation,
  useSubscription
} from "@apollo/react-hooks";
import { SafeAreaView } from "react-native-safe-area-view";
import {
  Ionicons,
  FontAwesome,
  Entypo,
  MaterialIcons,
  AntDesign
} from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import getChatsQuery from "../../../graphql/queries/chats.query";
import TopNavBar from "../../headers/TopNavBar";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import styles from "./ChatRoom.styles";

import getMessagesQuery from "../../../graphql/queries/messages.query";
import createMessageMutation from "../../../graphql/mutations/createMessage.mutation";
import messageSubscription from "../../../graphql/subscriptions/message.subscription";

const ChatRoom = ({
  chat: { id: chatId, name: chatRoomName },
  loggedinUser
}) => {
  const [chat, setChat] = useState({});
  const client = useApolloClient();

  const [
    addMessage,
    { data: messageData, loading, called, error }
  ] = useMutation(createMessageMutation, { onError: e => {} });

  const { data: dataFromSubscription } = useSubscription(messageSubscription, {
    variables: {
      chatId
    }
  });

  const { data } = useQuery(getMessagesQuery, {
    variables: { id: chatId },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (!!dataFromSubscription && !loading) {
      const cachedData = client.readQuery({
        query: getMessagesQuery,
        variables: { id: chatId }
      });

      const isMessagePresent = cachedData.getMessages.find(
        item => item.id === dataFromSubscription.message.id
      );

      const newData = [dataFromSubscription.message, ...cachedData.getMessages];
      if (!isMessagePresent) {
        try {
          client.writeQuery({
            query: getMessagesQuery,
            variables: { id: chatId },
            data: {
              ...data,
              getMessages: newData
            }
          });
        } catch (e) {
          console.log("Error", e);
        }
      }
    }
  }, [dataFromSubscription?.message?.id, loading]);

  const addMessageFunction = messageString => {
    addMessage({
      variables: {
        id: chatId,
        message: messageString,
        senderId: loggedinUser?.id
      },
      // refetchQueries: [
      //   {
      //     query: getMessagesQuery,
      //     variables: { id: chatId }
      //   }
      // ]
      optimisticResponse: {
        __typename: "Mutation",
        addMessage: {
          __typename: "Message",
          id: `${chatId}www`,
          message: messageString,
          user: {
            __typename: "User",
            id: loggedinUser?.id,
            email: loggedinUser?.email
          },
          createdAt: new Date()
        }
      },
      update: (cache, { data: { addMessage } }) => {
        const data = cache.readQuery({
          query: getMessagesQuery,
          variables: { id: chatId }
        });
        const i = 0;

        const newData = [addMessage, ...data.getMessages];

        try {
          cache.writeQuery({
            query: getMessagesQuery,
            variables: { id: chatId },
            data: {
              ...data,
              getMessages: newData
            }
          });
        } catch (e) {
          console.log("Error ", e);
        }

        const data1 = cache.readQuery({
          query: getMessagesQuery,
          variables: { id: chatId }
        });
      }
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <ImageBackground
        source={require("../../../../assets/chat-bg.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.wrapper}>
          <TopNavBar
            renderLeft={() => (
              <View style={styles.navLeftContent}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    style={styles.icon}
                    color="white"
                  />
                </TouchableOpacity>
                <View style={styles.navTitleContainer}>
                  <TouchableOpacity>
                    <Text style={styles.navTitle}>{chatRoomName}</Text>
                  </TouchableOpacity>
                  <Text style={styles.navLastSeen}>Chat Room</Text>
                </View>
              </View>
            )}
            renderRight={() => (
              <View style={styles.navRightContent}>
                <FontAwesome
                  name="video-camera"
                  size={24}
                  style={styles.icon}
                  color="white"
                />
                <MaterialIcons
                  name="call"
                  size={24}
                  style={styles.icon}
                  color="white"
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
        </View>
        <MessageList messages={data?.getMessages} loggedinUser={loggedinUser} />
        <MessageInput onSendMessage={addMessageFunction} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
