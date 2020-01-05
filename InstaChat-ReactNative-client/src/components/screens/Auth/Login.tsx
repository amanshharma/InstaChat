import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Card, Item, Input, Label, Button, Icon } from "native-base";
import { useMutation } from "@apollo/react-hooks";
import loginMutation from "../../../graphql/mutations/login.mutation";
import registerMutation from "../../../graphql/mutations/register.mutation";

const Login = () => {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("root");
  const [showLoginFailed, setShowLoginFailed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [login, data] = useMutation(loginMutation);
  const [register] = useMutation(registerMutation);
  const [showSignup, setShowSignup] = useState(false);

  const loginFunction = async () => {
    await login({
      variables: {
        username,
        password
      }
    })
      .then(({ data }) => {
        setShowLoginFailed(false);
        const { user } = data?.login;
        if (!!data?.login?.user?.id) {
          Actions.home({ user });
        }
      })
      .catch(e => {
        if (!!e) setShowLoginFailed(true);
      });
  };

  const signupFunction = async () => {
    console.log("ll", username, password);
    await register({
      variables: {
        email: username,
        password
      }
    })
      .then(({ data }) => {
        console.log(data);
        setShowError(false);
        const { id } = data?.register;
        if (!!id) setShowSuccess(true);
      })
      .catch(err => {
        console.log("Error:", err);
        setShowSuccess(false);
        if (!!err) setShowError(true);
      });
  };

  return (
    <View>
      <ImageBackground
        source={require("../../../../assets/chat-bg.jpg")}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            flexDirection: "column",
            //alignItems: "center"
            justifyContent: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              marginBottom: 10
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
              paddingHorizontal: 15,
              paddingBottom: 15,
              width: "90%",
              alignSelf: "center",
              backgroundColor: "#f7f4f0"
            }}
          >
            <View style={{ height: 30, marginTop: 5 }}>
              {!!showSignup && (
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => {
                    setShowSignup(false);
                    setShowSuccess(false);
                    setShowError(false);
                  }}
                >
                  <Text style={{ textAlign: "right", opacity: 0.8 }}>
                    Back To Login
                  </Text>
                </TouchableOpacity>
              )}
            </View>
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
                secureTextEntry
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
              />
            </Item>
            <TouchableOpacity
              disabled={!(!!username.trim() && !!password.trim())}
              style={{
                backgroundColor: !(!!username.trim() && !!password.trim())
                  ? "#D3D3D3"
                  : "#428bca",
                width: "100%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 18,
                borderRadius: 5
              }}
              onPress={showSignup ? signupFunction : loginFunction}
            >
              <Text style={{ color: "white" }}>
                {!!showSignup ? "SIGNUP" : "LOGIN"}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                height: 30,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              {(showSuccess || showError) && (
                <Text
                  style={{
                    alignSelf: "center",
                    color: showSuccess ? "green" : "red"
                  }}
                >
                  {showSuccess
                    ? "User Successfully Registered"
                    : "Username Already Taken"}
                </Text>
              )}
              {showLoginFailed && (
                <Text
                  style={{
                    alignSelf: "center",
                    color: "red"
                  }}
                >
                  Incorrect Username or Password
                </Text>
              )}
            </View>

            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            >
              <Text style={{ marginTop: 10, alignSelf: "center" }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
              style={{
                flexDirection: "row",
                marginTop: 20,
                alignSelf: "center"
              }}
              onPress={() => {
                setShowSignup(true);
                setShowLoginFailed(false);
              }}
            >
              <Text>Don't have an Account? </Text>
              <Text style={{ color: "#428bca" }}>SignUp</Text>
            </TouchableOpacity>
          </Card>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default Login;
