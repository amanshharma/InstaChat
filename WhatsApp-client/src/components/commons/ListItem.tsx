import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const ListItem = ({
  renderLeft: Left,
  renderRight: Right,
  title = "Testing",
  subTitle = "Testing",
  onPress = () => {}
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {!!Left && <Left />}
      <View>
        <Text>{title}</Text>
        <Text>{subTitle}</Text>
      </View>
      {!!Right && <Right />}
    </TouchableOpacity>
  );
};

export default ListItem;
