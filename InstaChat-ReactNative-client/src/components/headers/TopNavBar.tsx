import React from "react";
import { View, Text } from "react-native";
import { StylesContext } from "@material-ui/styles/StylesProvider";
import styles from "./TopNavBar.styles";

const TopNavBar = ({ renderLeft: Left, renderRight: Right }) => {
  return (
    <View style={styles.wrapper}>
      {!!Left && <Left />}
      {!!Right && <Right />}
    </View>
  );
};

export default TopNavBar;
