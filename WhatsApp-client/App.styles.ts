import React from "react";
import { StyleSheet, StyleProp, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-safe-area-view";

export default StyleSheet.create({
  container: {
    backgroundColor: "red",
    marginTop: Platform.OS === "ios" ? 0 : getStatusBarHeight()
  }
});
