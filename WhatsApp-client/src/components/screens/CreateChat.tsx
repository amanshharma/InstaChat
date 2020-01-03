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

import NavBar from "../headers/TopNavBar";

const CreateChat = () => {
  const { data, loading, error } = useQuery(getUsersQuery);
  const [createChat, { data: createChatData }] = useMutation(
    createChatMutation
  );
  const [users, setUsers] = useState([]);
  const [chatName, setChatName] = useState("");
  const { getUsers } = data || {};

  useEffect(() => {
    if (!!getUsers) {
      const newUsersList = [];
      getUsers.forEach(user => {
        newUsersList.push({ ...user, selected: false });
      });
      setUsers(newUsersList);
    }
  }, [data]);

  //console.log("DATA in Create chat room", data, error);

  if (!getUsers) {
    return <View></View>;
  }

  const createChatFunction = () => {
    console.log("name", chatName);
    console.log("selected", users);
    const userIds = [];
    users.forEach(user => {
      if (!!user?.selected) {
        userIds.push(user.id);
      }
    });

    createChat({
      variables: {
        chatName,
        userIds
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
          data={users}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => selectChat(item)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 70,
                  backgroundColor: "yellow"
                }}
              >
                <View style={{ width: 50, backgroundColor: "purple" }}>
                  <MaterialIcons
                    name={
                      item.selected ? "check-box" : "check-box-outline-blank"
                    }
                    size={24}
                  />
                </View>
                <Text>{item.email}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateChat;
