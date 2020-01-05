import React, { Fragment, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import { Card, Item, Input, Label, Button, Icon } from "native-base";
import getUsersQuery from "../../graphql/queries/users.query";
import createChatMutation from "../../graphql/mutations/createChat.mutation";
import getChatsQuery from "../../graphql/queries/chats.query";

import NavBar from "../headers/TopNavBar";
import styles from "./CreateChat.styles";

const CreateChat = ({ chatIds, loggedinUser }) => {
  const { data: allUsers, loading, error } = useQuery(getUsersQuery);
  const [createChat, data] = useMutation(createChatMutation);

  const [users, setUsers] = useState([]);
  const [valid, setValid] = useState(true);
  const [chatName, setChatName] = useState("");
  const { getUsers } = allUsers || {};

  useEffect(() => {
    if (!!getUsers) {
      const newUsersList = [];
      getUsers.forEach(user => {
        if (user.id !== loggedinUser.id)
          newUsersList.push({ ...user, selected: false });
      });
      setUsers(newUsersList);
    }
  }, [allUsers]);

  if (!getUsers) {
    return <View></View>;
  }

  const createChatFunction = async () => {
    const userIds = [loggedinUser.id];
    users.forEach(user => {
      if (!!user?.selected) {
        userIds.push(user.id);
      }
    });

    if (userIds.length < 2 || chatName.trim() === "") {
      setValid(false);
      return;
    } else {
      setValid(true);
    }

    await createChat({
      variables: {
        chatName,
        userIds
      },
      optimisticResponse: {
        __typename: "Mutation",
        addChat: {
          __typename: "Chat",
          id: "dummyId",
          name: chatName,
          friends: [
            {
              __typename: "User",
              id: "useDummyId"
            }
          ]
        }
      },
      update: (cache, { data: { addChat } }) => {
        const cachedData = cache.readQuery({
          query: getChatsQuery,
          variables: {
            chatIds
          }
        });
        const newData = [...cachedData?.getChats, addChat];

        try {
          cache.writeQuery({
            query: getChatsQuery,
            variables: { chatIds },
            data: {
              ...cachedData,
              getChats: newData
            }
          });
        } catch (e) {
          console.log("Error: ", e);
        }
      }
    });
  };

  const selectChat = user => {
    const updatedList = [];
    users.forEach(item => {
      if (item.id === user.id) {
        updatedList.push({ ...item, selected: !item.selected });
      } else {
        updatedList.push(item);
      }
    });

    setUsers(updatedList);
  };

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <NavBar
        renderLeft={() => (
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <AntDesign
                name="arrowleft"
                size={24}
                style={styles.arrowLeft}
                color="white"
              />
            </TouchableOpacity>
            <Text style={styles.titleText}>Create A New Chat</Text>
          </View>
        )}
      />

      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            {valid
              ? ""
              : "Error: Please enter a Group Name and select at least one User"}
          </Text>
        </View>
        <View style={styles.inputAndButtonContainer}>
          <Item style={styles.textInput}>
            <Label>Name</Label>
            <Input
              placeholder="Chat Group Name"
              value={chatName}
              onChangeText={text => setChatName(text)}
            />
          </Item>
          <TouchableOpacity
            style={styles.createButtonContainer}
            onPress={createChatFunction}
          >
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.listStyle}
          keyExtractor={item => item.id}
          data={users}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => selectChat(item)}>
              <View style={styles.listItemContainer}>
                <View style={styles.checboxIcon}>
                  <MaterialIcons
                    name={
                      item.selected ? "check-box" : "check-box-outline-blank"
                    }
                    size={30}
                  />
                </View>
                <Text style={styles.usernameText}>{item.email}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateChat;
