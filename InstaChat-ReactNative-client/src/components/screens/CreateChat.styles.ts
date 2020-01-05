import { StyleSheet } from "react-native";

export default StyleSheet.create({
  titleContainer: { flexDirection: "row", alignItems: "center" },
  arrowLeft: { padding: 10 },
  titleText: { color: "white" },
  container: { marginHorizontal: 20, marginVertical: 10 },
  messageContainer: { height: 30 },
  messageText: { color: "red" },
  inputAndButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  textInput: { flexGrow: 1 },
  createButtonContainer: {
    borderWidth: 2,
    borderColor: "#2c6157",
    borderRadius: 20,
    marginLeft: 8
  },
  createButtonText: { padding: 10 },
  listStyle: { marginTop: 20 },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 70
  },
  checboxIcon: { width: 50 },
  usernameText: { fontSize: 20 }
});
