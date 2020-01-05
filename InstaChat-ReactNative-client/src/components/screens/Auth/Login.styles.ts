import { StyleSheet } from "react-native";

export default StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%"
  },
  keyboardAvoidingContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  appLogoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 10
  },
  instaTextContainer: {
    backgroundColor: "#2c6157",
    paddingVertical: 6,
    paddingRight: 4,
    paddingLeft: 20,
    borderRadius: 8
  },
  intsaText: { fontSize: 30, color: "white" },
  chatTextContainer: { paddingVertical: 6 },
  chatIcon: { color: "#2c6157", alignSelf: "center", fontSize: 60 },
  chatText: { fontSize: 30, color: "#2c6157" },
  loginSignupCardContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#f7f4f0"
  },
  backToLoginButtonContainer: { height: 30, marginTop: 5 },
  backToLoginTouchableStyle: { alignSelf: "flex-end" },
  backToLoginText: { textAlign: "right", opacity: 0.8 },
  loginSignupButtonContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    borderRadius: 5
  },
  loginSignupText: { color: "white" },
  messageContainer: {
    height: 30,
    flexDirection: "row",
    justifyContent: "center"
  },
  signupMessageText: { alignSelf: "center" },
  loginMessageText: {
    alignSelf: "center",
    color: "red"
  },
  forgotPasswordText: { marginTop: 10, alignSelf: "center" },
  newSignupAccountContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "center"
  },
  newSignupButtonText: { color: "#428bca" }
});
