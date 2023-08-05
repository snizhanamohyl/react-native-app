import { Feather } from "@expo/vector-icons";
import { getHeaderTitle } from "@react-navigation/elements";
import { StyleSheet, Text, View } from "react-native";

export default Header = ({ navigation, route, options, setIsAuth }) => {
  const title = getHeaderTitle(options, route.name);

  const logout = () => {
    setIsAuth(false);
  };

  return (
    <View style={styles.wrap}>
      {route.name === "Create" && (
        <Feather
          style={styles.backBtn}
          name="arrow-left"
          size={24}
          color="#212121"
        />
      )}
      <Text title={title} style={styles.title}>
        {title}
      </Text>
      {route.name === "Posts" && (
        <Feather
          style={styles.btn}
          name="log-out"
          size={24}
          color="#BDBDBD"
          onPress={logout}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 54,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  btn: {
    position: "absolute",
    bottom: "50%",
    right: 10,
  },
  backBtn: {
    position: "absolute",
    bottom: "50%",
    left: 10,
  },
});
