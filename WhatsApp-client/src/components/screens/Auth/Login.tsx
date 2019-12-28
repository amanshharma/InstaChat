import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { Card, Item, Input, Label, Button, Icon } from "native-base";

const Login = () => {
  return (
    <KeyboardAvoidingView style={{ marginTop: 120, marginHorizontal: 40 }}>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 100,
          justifyContent: "center",
          alignItems: "flex-end"
        }}
      >
        <View
          style={{
            backgroundColor: "purple",
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
            style={{ color: "purple", alignSelf: "center", fontSize: 60 }}
          />
          <Text style={{ fontSize: 30, color: "purple" }}> Chat</Text>
        </View>
      </View>
      <Card style={{ padding: 15 }}>
        <Item>
          <Icon active name="user" type="AntDesign" />
          <Input placeholder="Username" />
        </Item>
        <Item>
          <Icon active name="lock" type="AntDesign" />
          <Input placeholder="Password" />
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
    </KeyboardAvoidingView>
  );
};

export default Login;
