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
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <View style={styles.container}>
          <ChatList />
        </View>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}
