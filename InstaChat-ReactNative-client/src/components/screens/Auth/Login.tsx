import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Card, Item, Input, Icon } from "native-base";
import { useMutation } from "@apollo/react-hooks";
import loginMutation from "../../../graphql/mutations/login.mutation";
import registerMutation from "../../../graphql/mutations/register.mutation";

import styles from "./Login.styles";

const Login = () => {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("root");
  const [showLoginFailed, setShowLoginFailed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [login] = useMutation(loginMutation);
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
    await register({
      variables: {
        email: username,
        password
      }
    })
      .then(({ data }) => {
        setShowError(false);
        const { id } = data?.register;
        if (!!id) setShowSuccess(true);
      })
      .catch(err => {
        setShowSuccess(false);
        if (!!err) setShowError(true);
      });
  };

  return (
    <View>
      <ImageBackground
        source={require("../../../../assets/chat-bg.jpg")}
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.keyboardAvoidingContainer}
        >
          <View style={styles.appLogoContainer}>
            <View style={styles.instaTextContainer}>
              <Text style={styles.intsaText}>Insta</Text>
            </View>
            <View style={styles.chatTextContainer}>
              <Icon
                active
                name="wechat"
                type="MaterialCommunityIcons"
                style={styles.chatIcon}
              />
              <Text style={styles.chatText}> Chat</Text>
            </View>
          </View>
          <Card style={styles.loginSignupCardContainer}>
            <View style={styles.backToLoginButtonContainer}>
              {!!showSignup && (
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                  style={styles.backToLoginTouchableStyle}
                  onPress={() => {
                    setShowSignup(false);
                    setShowSuccess(false);
                    setShowError(false);
                  }}
                >
                  <Text style={styles.backToLoginText}>Back To Login</Text>
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
              style={[
                {
                  backgroundColor: !(!!username.trim() && !!password.trim())
                    ? "#D3D3D3"
                    : "#428bca"
                },
                styles.loginSignupButtonContainer
              ]}
              onPress={showSignup ? signupFunction : loginFunction}
            >
              <Text style={styles.loginSignupText}>
                {!!showSignup ? "SIGNUP" : "LOGIN"}
              </Text>
            </TouchableOpacity>

            <View style={styles.messageContainer}>
              {(showSuccess || showError) && (
                <Text
                  style={[
                    {
                      color: showSuccess ? "green" : "red"
                    },
                    styles.signupMessageText
                  ]}
                >
                  {showSuccess
                    ? "User Successfully Registered"
                    : "Username Already Taken"}
                </Text>
              )}
              {showLoginFailed && (
                <Text style={styles.loginMessageText}>
                  Incorrect Username or Password
                </Text>
              )}
            </View>

            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
              style={styles.newSignupAccountContainer}
              onPress={() => {
                setShowSignup(true);
                setShowLoginFailed(false);
              }}
            >
              <Text>Don't have an Account? </Text>
              <Text style={styles.newSignupButtonText}>SignUp</Text>
            </TouchableOpacity>
          </Card>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default Login;
