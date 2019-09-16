import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { FontAwesome, Octicons, Entypo, AntDesign } from "@expo/vector-icons";
import styles from "./MessageInput.styles";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
      <View style={styles.leftContent}>
        <TouchableOpacity style={styles.iconPaddingRight}>
          <Octicons name="smiley" color="grey" size={24} />
        </TouchableOpacity>
        <TextInput
          placeholder="Type a message"
          style={styles.textInput}
          onSubmitEditing={() => {
            onSendMessage(message);
            setMessage("");
          }}
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
      <View style={styles.microphone}>
        <FontAwesome name="microphone" color="white" size={24} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageInput;
