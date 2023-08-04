import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require("./assets/images/register-bg.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Реєстрація</Text>
        <View style={styles.inputsWrap}>
          <View style={styles.input}>
            <TextInput placeholder="Логін"></TextInput>
          </View>
          <View style={styles.input}>
            <TextInput placeholder="Адреса електронної пошти"></TextInput>
          </View>
          <View
            style={{
              ...styles.input,
              marginBottom: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput placeholder="Пароль"></TextInput>
            <Text style={styles.show}>Показати</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnText}>Зареєстуватися</Text>
        </TouchableOpacity>
        <Text style={styles.navText}>Вже є акаунт? Увійти</Text>
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
    paddingTop: 92,
    // flex: 1,
    // justifyContent: "flex-end",
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
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 16,
    height: 50,
  },
  inputText: {
    fontSize: 16,
  },
  inputsWrap: {
    marginBottom: 43,
  },
  show: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 1.1875,
  },
  btn: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  btnText: {
    color: "#ffffff",
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    fontSize: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  navText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    fontSize: 16,
  },
});
