import React, { Fragment } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { AntDesign } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import { Card, Item, Input, Label, Button, Icon } from "native-base";

import NavBar from "../headers/TopNavBar";

const CreateChat = () => {
  const dummyData = [
    "user1",
    "user1",
    "user1",
    "user1",
    "user1",
    "user1",
    "user1",
    "user1"
  ];
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

      <View style={{ marginHorizontal: 40, marginVertical: 40 }}>
        <Item>
          <Label>Name</Label>
          <Input placeholder="Chat Group Name" />
        </Item>
      </View>
    </SafeAreaView>
  );
};

export default CreateChat;
