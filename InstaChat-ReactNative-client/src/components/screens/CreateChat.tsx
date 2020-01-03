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

const CreateChat = ({ chatIds }) => {
  const { data: allUsers, loading, error } = useQuery(getUsersQuery);
  const [createChat, data] = useMutation(createChatMutation);

  const [users, setUsers] = useState([]);
  const [chatName, setChatName] = useState("");
  const { getUsers } = allUsers || {};

  useEffect(() => {
    if (!!getUsers) {
      const newUsersList = [];
      getUsers.forEach(user => {
        newUsersList.push({ ...user, selected: false });
      });
      setUsers(newUsersList);
    }
  }, [allUsers]);

  //console.log("DATA in Create chat room", data, error);

  if (!getUsers) {
    return <View></View>;
  }

  const createChatFunction = async () => {
    console.log("name", chatName);
    console.log("selected", users);

    const userIds = [];
    users.forEach(user => {
      if (!!user?.selected) {
        userIds.push(user.id);
      }
    });

    console.log("USERIDS: ", userIds);

    await createChat({
      variables: {
        chatName,
        userIds: ["ck4j374ho00fy0737binvd00f"]
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
        console.log("ADD CHAT DATA:  ", addChat);
        const cachedData = cache.readQuery({
          query: getChatsQuery,
          variables: {
            chatIds
          }
        });
        console.log("cachedData", cachedData);
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
          console.log(e);
        }
      }
    });
    //Actions.pop();
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <AntDesign
                name="arrowleft"
                size={24}
                style={{ padding: 10 }}
                color="white"
              />
            </TouchableOpacity>
            <Text style={{ color: "white" }}>Create A New Chat</Text>
          </View>
        )}
      />

      <View style={{ marginHorizontal: 20, marginVertical: 40 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Item style={{ flexGrow: 1 }}>
            <Label>Name</Label>
            <Input
              placeholder="Chat Group Name"
              value={chatName}
              onChangeText={text => setChatName(text)}
            />
          </Item>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: "#2c6157",
              borderRadius: 20,
              marginLeft: 8
            }}
            onPress={createChatFunction}
          >
            <Text style={{ padding: 10 }}>Create</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ marginTop: 20 }}
          keyExtractor={item => item.id}
          data={users}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => selectChat(item)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 70
                }}
              >
                <View style={{ width: 50 }}>
                  <MaterialIcons
                    name={
                      item.selected ? "check-box" : "check-box-outline-blank"
                    }
                    size={30}
                  />
                </View>
                <Text style={{ fontSize: 20 }}>{item.email}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateChat;
