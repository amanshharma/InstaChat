import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import gql from "graphql-tag";
import { useQuery, useApolloClient, useMutation } from "@apollo/react-hooks";
import { SafeAreaView } from "react-native-safe-area-view";
import {
  Ionicons,
  FontAwesome,
  Entypo,
  MaterialIcons,
  AntDesign
} from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import TopNavBar from "../../headers/TopNavBar";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import styles from "./ChatRoom.styles";

const ChatRoom = ({ id }) => {
  const [chat, setChat] = useState(null);
  const client = useApolloClient();

  const getMessagesQuery = gql`
    query getMessages($chatId: ID!) {
      chat(chatId: $chatId) {
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

  const { loading, error, data } = useQuery(getMessagesQuery, {
    variables: { chatId: id }
  });
  useEffect(() => {
    if (!loading) setChat(data.chat);
  }, [loading]);

  const addMessageMutation = gql`
    mutation AddMessage($chatId: ID!, $content: String!) {
      addMessage(chatId: $chatId, content: $content) {
        id
        content
        createdAt
      }
    }
  `;

  const [addMessage] = useMutation(addMessageMutation);

  if (!!loading || chat === null)
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );

  const submit = messageText => {
    addMessage({
      variables: { chatId: id, content: messageText },
      optimisticResponse: {
        __typename: "Mutation",
        addMessage: {
          __typename: "Message",
          id: Math.random()
            .toString(36)
            .substr(2, 9),
          createdAt: new Date(),
          content: messageText
        },
        update: (client, { data }) => {
          console.log("res", data);
          if (data && data.addMessage) {
            client.writeQuery({
              data: {
                chat: {
                  ...chat,
                  messages: [...chat.messages, data.addMessage]
                }
              }
            });
          }
        }
      }
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/chat-bg.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      {console.log("chat in render", chat)}
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
              <View style={styles.image}>
                <Image
                  source={{ uri: chat.picture }}
                  style={styles.thumbnail}
                />
              </View>
              <View style={styles.navTitleContainer}>
                <TouchableOpacity>
                  <Text style={styles.navTitle}>{chat.name}</Text>
                </TouchableOpacity>
                <Text style={styles.navLastSeen}>Last Seen</Text>
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
      <Text>amandeep</Text>
      <MessageList messages={chat.messages} />
      <MessageInput onSendMessage={submit} />
    </ImageBackground>
  );
};

export default ChatRoom;
