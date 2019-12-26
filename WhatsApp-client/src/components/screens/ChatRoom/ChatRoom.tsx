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
import getChatsQuery from "../../../graphql/queries/chats.query";
import TopNavBar from "../../headers/TopNavBar";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import styles from "./ChatRoom.styles";

import getMessagesQuery from "../../../graphql/queries/messages.query";
import createMessageMutation from "../../../graphql/mutations/createMessage.mutation";
import messageSubscription from "../../../graphql/subscriptions/message.subscription";

const ChatRoom = ({ chatId }) => {
  //console.log("ID in chatroom", chatId);
  const [chat, setChat] = useState({});
  const client = useApolloClient();

  const loggedinUserId = "ck4jyzes500lk0737pme8tqms";

  const [
    addMessage,
    { data: messageData, loading, called, error }
  ] = useMutation(createMessageMutation, { onError: e => {} });

  const { data } = useQuery(getMessagesQuery, {
    variables: { id: chatId },
    fetchPolicy: "cache-and-network"
  });

  // console.log("loading", loading);
  // console.log("error", error);
  console.log("data", data);

  const addMessageFunction = messageString => {
    //console.log("addMessageData", messageData);

    addMessage({
      variables: { id: chatId, message: messageString },
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
            email: "user"
          }
        }
      },
      update: (cache, { data: { addMessage } }) => {
        const data = cache.readQuery({
          query: getMessagesQuery,
          variables: { id: chatId }
        });
        console.log("CachedData: ", data);
        console.log("addMessage: ", addMessage);
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
          console.log("error output: ", e);
        }

        const data1 = cache.readQuery({
          query: getMessagesQuery,
          variables: { id: chatId }
        });

        console.log("dataone ##", data1);
      }
    }).then(res => console.log(res));
    //console.log("addMessageData", messageData);
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <ImageBackground
        source={require("../../../../assets/chat-bg.jpg")}
        style={{ width: "100%", height: "100%" }}
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
                <View style={styles.image}>
                  <Image source={{ uri: undefined }} style={styles.thumbnail} />
                </View>
                <View style={styles.navTitleContainer}>
                  <TouchableOpacity>
                    <Text style={styles.navTitle}>{name}</Text>
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
        <MessageList messages={data?.getMessages} />
        <MessageInput onSendMessage={addMessageFunction} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

// useEffect(() => {
//   if (!loading) setChat(data.chat);
// }, [loading]);

// const addMessageMutation = gql`
//   mutation AddMessage($chatId: ID!, $content: String!) {
//     addMessage(chatId: $chatId, content: $content) {
//       id
//       content
//       createdAt
//     }
//   }
// `;

//const [addMessage, { data: mutationData }] = useMutation(addMessageMutation);

// if (!!loading || chat === null)
//   return (
//     <View>
//       <Text>loading...</Text>
//     </View>
//   );

//console.log("mutationData", mutationData);

// let clientChatsData;
// try {
//   clientChatsData = client.readQuery({
//     query: getChatsQuery
//   });
// } catch (e) {
//   return;
// }
// const chats = clientChatsData.chats;
// const chatIndex = chats.findIndex(
//   (currentChat: any) => currentChat.id === id
// );
// if (chatIndex === -1) return;
// const chatWhereAdded = chats[chatIndex];
// if ((mutationData || {}).addMessage) {
//   console.log("indie");
//   chatWhereAdded.lastMessage = mutationData.addMessage;
//   // The chat will appear at the top of the ChatsList component
//   chats.splice(chatIndex, 1);
//   chats.unshift(chatWhereAdded);
//   client.writeQuery({
//     query: chatsQuery,
//     data: { chats: chats }
//   });
// }

// const submit = messageText => {
//   console.log("mesageText", messageText);
//   addMessage({
//     variables: { chatId: id, content: messageText },
//     optimisticResponse: {
//       __typename: "Mutation",
//       addMessage: {
//         __typename: "Message",
//         id: Math.random()
//           .toString(36)
//           .substr(2, 9),
//         createdAt: new Date(),
//         content: messageText
//       },
//       update: (client, { data }) => {
//         console.log("res", data);
//         // if (data && data.addMessage) {
//         //   client.writeQuery({
//         //     data: {
//         //       chat: {
//         //         ...chat,
//         //         messages: [...chat.messages, data.addMessage]
//         //       }
//         //     }
//         //   });
//         // }
//       }
//     }
//   });
// };
