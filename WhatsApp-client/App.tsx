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
import { getStatusBarHeight } from "react-native-safe-area-view";
import styles from "./App.styles";

YellowBox.ignoreWarnings(["Remote debugger"]);
export default function App() {
  return (
    <View style={styles.container}>
      <ChatList />
    </View>
  );
}
