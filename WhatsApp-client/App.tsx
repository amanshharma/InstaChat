import React from "react";
import {
  StyleSheet,
  Text,
  View,
  YellowBox,
  SafeAreaView,
  Platform
} from "react-native";
import ChatList from "./src/components/screens/ChatList";
import client from "./client";
import { getStatusBarHeight } from "react-native-safe-area-view";
import { ApolloProvider } from "@apollo/react-hooks";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Router, Scene, Actions, Stack } from "react-native-router-flux";
import styles from "./App.styles";

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="chatList" component={ChatList} title="Chats" initial={true} />
  </Scene>
);

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
              component={ChatList}
              title="WhatsApp"
              initial={true}
            />
            <Scene key="register" component={ChatList} title="Register" />
            <Scene key="home" component={ChatList} />
          </Stack>
        </Router>
      </ApolloProvider>
    </MuiThemeProvider>
  );
}
