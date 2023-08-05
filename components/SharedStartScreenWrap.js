import {
  StyleSheet,
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export const SharedStartScreenWrap = ({
  children,
  wrapStyle,
  isKeyboardShown,
  setIsKeyboardShown,
}) => {
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
                ...wrapStyle,
                paddingBottom: isKeyboardShown ? 160 : 45,
              }}
            >
              {children}
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
