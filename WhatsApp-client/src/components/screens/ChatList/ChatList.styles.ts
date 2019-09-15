import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-safe-area-view";

const styles = StyleSheet.create({
  wrapper: {
    marginTop: getStatusBarHeight()
  },
  navRightContent: {
    flexDirection: "row"
  },
  icon: {
    paddingHorizontal: 5
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  }
});

export default styles;
