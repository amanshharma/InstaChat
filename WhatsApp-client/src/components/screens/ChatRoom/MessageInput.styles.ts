import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 4,
    right: 4,
    left: 4
  },
  leftContent: {
    flexDirection: "row",
    flexGrow: 1,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 25
  },
  textInput: {
    flexGrow: 1
  },
  microphone: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c6157",
    padding: 12,
    width: 48,
    height: 48,
    borderRadius: 24
  },
  iconPaddingRight: {
    paddingRight: 12
  }
});

export default styles;
