import React, { Component, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Card, Item, Input, Label, Button, Icon } from "native-base";
import { useMutation } from "@apollo/react-hooks";
import loginMutation from "../../../graphql/mutations/login.mutation";

const Login = () => {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("root");
  const [login, data] = useMutation(loginMutation);

  const loginFunction = async () => {
    await login({
      variables: {
        username,
        password
      }
    }).then(({ data }) => {
      const { user } = data?.login;
      if (!!data?.login?.user?.id) {
        console.log("Inside If", user);
        Actions.home({ user });
      }
    });
  };

  return (
    <KeyboardAvoidingView>
      <ImageBackground
        source={require("../../../../assets/chat-bg.jpg")}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 80,
            marginTop: 70,
            justifyContent: "center",
            alignItems: "flex-end"
          }}
        >
          <View
            style={{
              backgroundColor: "#2c6157",
              paddingVertical: 6,
              paddingRight: 4,
              paddingLeft: 20,
              borderRadius: 8
            }}
          >
            <Text style={{ fontSize: 30, color: "white" }}>Insta</Text>
          </View>
          <View style={{ paddingVertical: 6 }}>
            <Icon
              active
              name="wechat"
              type="MaterialCommunityIcons"
              style={{ color: "#2c6157", alignSelf: "center", fontSize: 60 }}
            />
            <Text style={{ fontSize: 30, color: "#2c6157" }}> Chat</Text>
          </View>
        </View>
        <Card
          style={{
            padding: 15,
            width: "90%",
            alignSelf: "center",
            backgroundColor: "#f7f4f0"
          }}
        >
          <Item>
            <Icon active name="user" type="AntDesign" />
            <Input
              placeholder="Username"
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </Item>
          <Item>
            <Icon active name="lock" type="AntDesign" />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </Item>
          <TouchableOpacity
            style={{
              backgroundColor: "#428bca",
              width: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 18,
              borderRadius: 5
            }}
            onPress={loginFunction}
          >
            <Text style={{ color: "white" }}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
          >
            <Text style={{ marginTop: 20, alignSelf: "center" }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            style={{ flexDirection: "row", marginTop: 20, alignSelf: "center" }}
          >
            <Text>Don't have an Account? </Text>
            <Text style={{ color: "#428bca" }}>SignUp</Text>
          </TouchableOpacity>
        </Card>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Login;
