import React from "react";
import {
  StyleSheet,
  Text,
  View,
  YellowBox,
  SafeAreaView,
  Platform
} from "react-native";
import ChatList from "./src/components/screens/ChatList/ChatList";
import ChatRoom from "./src/components/screens/ChatRoom/ChatRoom";
import client from "./client";
import { getStatusBarHeight } from "react-native-safe-area-view";
import { ApolloProvider } from "@apollo/react-hooks";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Router, Scene, Actions, Stack } from "react-native-router-flux";

import LoginComponent from "./src/components/screens/Auth/Login";
import CreateChat from "./src/components/screens/CreateChat";

import styles from "./App.styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#2c6157" },
    secondary: { main: "#6fd056" }
  }
});
YellowBox.ignoreWarnings(["Remote debugger"]);
export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <Stack key="root">
            <Scene
              key="login"
              component={LoginComponent}
              title="WhatsApp"
              initial={true}
              hideNavBar
            />
            <Scene
              key="chatroom"
              component={ChatRoom}
              title="Register"
              hideNavBar
            />
            <Scene
              key="createChat"
              component={CreateChat}
              title="Create Chat"
              hideNavBar
            />
            <Scene key="home" component={ChatList} hideNavBar />
          </Stack>
        </Router>
      </ApolloProvider>
    </MuiThemeProvider>
  );
}
