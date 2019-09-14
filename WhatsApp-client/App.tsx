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
import styles from "./App.styles";

YellowBox.ignoreWarnings(["Remote debugger"]);
export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <ChatList />
      </View>
    </ApolloProvider>
  );
}
