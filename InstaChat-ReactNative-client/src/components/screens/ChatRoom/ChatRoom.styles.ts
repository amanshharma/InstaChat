import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-safe-area-view";

const styles = StyleSheet.create({
  wrapper: {
    marginTop: getStatusBarHeight()
  },
  navRightContent: {
    flexDirection: "row"
  },
  navLeftContent: {
    flexDirection: "row",
    alignItems: "center"
  },
  navTitleContainer: {
    justifyContent: "center",
    paddingLeft: 5
  },
  icon: {
    paddingHorizontal: 5
  },
  navTitle: {
    fontWeight: "bold",
    color: "white"
  },
  navLastSeen: {
    color: "#f2f2f2",
    opacity: 0.8
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2
  },
  image: {
    paddingHorizontal: 8
  },
  backgroundImage: { width: "100%", height: "100%" }
});

export default styles;
