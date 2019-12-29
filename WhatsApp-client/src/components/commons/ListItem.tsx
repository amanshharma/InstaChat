import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";

import styles from "./ListItem.styles";

const ListItem = ({
  renderLeft: Left,
  image,
  renderRight: Right,
  title,
  subTitle,
  onPress = () => {},
  timeStamp,
  isGroupChat
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* <Image source={{ uri: image }} style={styles.thumbnail}></Image> */}
      <View
        style={[
          styles.thumbnail,
          {
            borderWidth: 2,
            borderColor: "grey",
            opacity: 0.7,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10
          }
        ]}
      >
        <FontAwesome
          name={isGroupChat ? "users" : "user"}
          size={24}
          color="black"
        />
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
