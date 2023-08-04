import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useState } from "react";

export default function App() {
  const [isSecuredPassword, setIsSecuredPassword] = useState(true);
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const togglePasswordVisibility = () => {
    setIsSecuredPassword((prevState) => !prevState);
  };

  const toggleFocus = (inputName) => {
    setIsFocused((prev) => ({ ...prev, [inputName]: !prev[inputName] }));
  };

  return (
    <ImageBackground
      source={require("./assets/images/register-bg.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.content}>
        {/* <KeyboardAvoidingView behavior={"padding"}> */}
        <View style={styles.avatarWrap}>
          <Image style={styles.avatar} source={""} />
          <TouchableOpacity style={styles.plus} activeOpacity={0.8}>
            <EvilIcons name="plus" size={32} color="#FF6C00" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Реєстрація</Text>
        <View style={styles.inputsWrap}>
          <View
            style={{
              ...styles.input,
              borderColor: isFocused.name ? "#FF6C00" : "#E8E8E8",
            }}
          >
            <TextInput
              style={styles.inputText}
              onFocus={() => toggleFocus("name")}
              onBlur={() => toggleFocus("name")}
              placeholder="Логін"
            ></TextInput>
          </View>
          <View
            style={{
              ...styles.input,
              borderColor: isFocused.email ? "#FF6C00" : "#E8E8E8",
            }}
          >
            <TextInput
              style={styles.inputText}
              onFocus={() => toggleFocus("email")}
              onBlur={() => toggleFocus("email")}
              placeholder="Адреса електронної пошти"
            ></TextInput>
          </View>
          <View
            style={{
              ...styles.input,
              borderColor: isFocused.password ? "#FF6C00" : "#E8E8E8",
              marginBottom: 0,
            }}
          >
            <TextInput
              style={styles.inputText}
              secureTextEntry={isSecuredPassword}
              onFocus={() => toggleFocus("password")}
              onBlur={() => toggleFocus("password")}
              placeholder="Пароль"
            ></TextInput>
            <Text style={styles.show} onPress={togglePasswordVisibility}>
              Показати
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnText}>Зареєстуватися</Text>
        </TouchableOpacity>
        <Text style={styles.navText}>Вже є акаунт? Увійти</Text>
        {/* </KeyboardAvoidingView> */}
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

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
    // paddingBottom: 116,
    paddingTop: 92,
    fontFamily: "Roboto-Regular",
    position: "relative",
  },
  avatarWrap: {
    position: "absolute",
    left: "50%",
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
  title: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    letterSpacing: 0.3,
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    color: "#BDBDBD",
  },
  inputText: {
    fontSize: 16,
    height: "100%",
    flexGrow: 1,
    color: "#212121",
  },
  inputsWrap: {
    marginBottom: 43,
  },
  show: {
    color: "#1B4371",
    fontSize: 16,
  },
  btn: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
  },
  btnText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  navText: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
  },
});
