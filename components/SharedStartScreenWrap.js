import { StyleSheet, View, ImageBackground } from "react-native";

export const SharedStartScreenWrap = ({ children, wrapStyle }) => {
  return (
    <ImageBackground
      source={require("../assets/images/register-bg.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View
        style={{
          ...styles.content,
          ...wrapStyle,
        }}
      >
        {children}
      </View>
    </ImageBackground>
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
    paddingBottom: 45,
    paddingTop: 92,
    fontFamily: "Roboto-Regular",
    position: "relative",
  },
});
