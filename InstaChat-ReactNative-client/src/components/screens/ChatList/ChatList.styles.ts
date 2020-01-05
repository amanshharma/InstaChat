import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-safe-area-view";

const styles = StyleSheet.create({
  wrapper: {
    marginTop: getStatusBarHeight(),
    flex: 1
  },
  navRightContent: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    paddingHorizontal: 5
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  logoContainer: { flexDirection: "row", alignItems: "center" },
  arrowLeft: { paddingRight: 8 },
  loggedUsernameText: { color: "#ffffff", marginRight: 8, fontSize: 18 },
  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  headerText: { padding: 10 },
  createChatButtonContainer: {
    borderWidth: 2,
    borderColor: "#2c6157",
    borderRadius: 20
  },
  chatListStyle: { marginTop: 10 }
});

export default styles;
