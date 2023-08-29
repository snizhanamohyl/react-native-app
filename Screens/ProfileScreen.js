import { EvilIcons, Feather } from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authOperations";
// import SharedStartScreenWrap from "../screens/SharedStartScreenWrap";

export default ProfileScreen = () => {
  const { name } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <ImageBackground
      source={require("../assets/images/register-bg.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.content}>
        <View style={styles.avatarWrap}>
          <Image style={styles.avatar} source={""} />
          <TouchableOpacity style={styles.plus} activeOpacity={0.8}>
            <EvilIcons name="plus" size={32} color="#FF6C00" />
          </TouchableOpacity>
        </View>
        <Feather
          style={styles.logout}
          name="log-out"
          size={24}
          color="#BDBDBD"
          onPress={onLogout}
        />

        <Title title={name} />
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
    paddingTop: 92,
    paddingBottom: 42,
    fontFamily: "Roboto-Regular",
  },
  avatarWrap: {
    position: "absolute",
    left: "50%",
  },
  logout: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    transform: [{ translateX: -44 }, { translateY: -60 }],
  },
  plus: {
    position: "absolute",
    transform: [{ translateX: 60 }, { translateY: 21 }],
  },
});
