import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";

import NavBar from "../headers/TopNavBar";

const CreateChat = () => {
  return (
    <View>
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
    </View>
  );
};

export default CreateChat;
