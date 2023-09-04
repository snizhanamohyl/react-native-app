import { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";

export const SharedStartScreenWrap = ({ isLogin }) => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setIsKeyboardShown(false);
  };

  Keyboard.addListener("keyboardDidHide", hideKeyboard);

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <ImageBackground
        source={require("../assets/images/register-bg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <TouchableWithoutFeedback onPress={hideKeyboard}>
            <View
              style={{
                ...styles.content,
                paddingTop: isLogin ? 32 : 92,
                paddingBottom: isKeyboardShown ? 160 : isLogin ? 111 : 45,
              }}
            >
              {isLogin ? (
                <LoginScreen setIsKeyboardShown={setIsKeyboardShown} />
              ) : (
                <RegistrationScreen setIsKeyboardShown={setIsKeyboardShown} />
              )}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 92,
    fontFamily: "Roboto-Regular",
  },
});
