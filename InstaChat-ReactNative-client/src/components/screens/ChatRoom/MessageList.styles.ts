import { StyleSheet } from "react-native";

export default StyleSheet.create({
  itemSeparater: { height: 6, width: "100%" },
  messageContainer: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingBottom: 2
  },
  username: { color: "purple", fontWeight: "bold" },
  time: { fontSize: 10, opacity: 0.6, alignSelf: "flex-end" },
  listContentContainerStyle: {
    paddingTop: 71,
    paddingBottom: 20,
    paddingHorizontal: 10
  }
});
