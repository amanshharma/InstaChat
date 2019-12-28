import { StyleSheet, StyleProp, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-safe-area-view";
import { borderRadius, flexbox } from "@material-ui/system";

export default StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20
  },
  content: {
    flexGrow: 1,
    borderBottomColor: "#bfbfbf",
    borderBottomWidth: 1,
    paddingVertical: 15
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2
  },
  image: {
    paddingRight: 10
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontWeight: "bold"
  },
  subTitle: {
    color: "grey",
    opacity: 0.9
  },
  timeStamp: {
    color: "grey",
    opacity: 0.9
  }
});
