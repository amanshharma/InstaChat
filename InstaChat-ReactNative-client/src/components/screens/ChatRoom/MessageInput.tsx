import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import {
  FontAwesome,
  Octicons,
  Entypo,
  AntDesign,
  MaterialIcons
} from "@expo/vector-icons";
import styles from "./MessageInput.styles";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <View style={styles.wrapper}>
      <View style={styles.leftContent}>
        <TouchableOpacity style={styles.iconPaddingRight}>
          <Octicons name="smiley" color="grey" size={24} />
        </TouchableOpacity>
        <TextInput
          placeholder="Type a message"
          multiline
          style={styles.textInput}
          onSubmitEditing={() => {}}
          value={message}
          onChange={event => setMessage(event.nativeEvent.text)}
        />
        <TouchableOpacity style={styles.iconPaddingRight}>
          <Entypo name="attachment" color="grey" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="camera" color="grey" size={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.microphone}
        onPress={() => {
          if (message.trim().length > 0) {
            onSendMessage(message);
            setMessage("");
          }
        }}
      >
        {message.trim().length <= 0 ? (
          <FontAwesome name="microphone" color="white" size={24} />
        ) : (
          <MaterialIcons name="send" color="white" size={24} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
