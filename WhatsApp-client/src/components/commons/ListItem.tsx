import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "./ListItem.styles";

const ListItem = ({
  renderLeft: Left,
  image,
  renderRight: Right,
  title,
  subTitle,
  onPress = () => {},
  timeStamp
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.image}>
        <Image source={{ uri: image }} style={styles.thumbnail}></Image>
      </View>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.timeStamp}>{timeStamp}</Text>
        </View>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
