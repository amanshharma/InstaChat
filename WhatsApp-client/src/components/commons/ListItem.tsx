import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "./ListItem.styles";

const ListItem = ({
  renderLeft: Left,
  image,
  renderRight: Right,
  title = "Testing",
  subTitle = "Testing",
  onPress = () => {}
}) => {
  console.log("image", image);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {!!Left && <Left />}
      <View style={styles.image}>
        <Image source={{ uri: image }} style={styles.thumbnail}></Image>
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      {!!Right && <Right />}
    </TouchableOpacity>
  );
};

export default ListItem;
