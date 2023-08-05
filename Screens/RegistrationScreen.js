import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import { SharedStartScreenWrap } from "../components/SharedStartScreenWrap";
import { useState } from "react";

export default function RegistrationScreen() {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  return (
    <SharedStartScreenWrap
      isKeyboardShown={isKeyboardShown}
      setIsKeyboardShown={setIsKeyboardShown}
    >
      <View style={styles.avatarWrap}>
        <Image style={styles.avatar} source={""} />
        <TouchableOpacity style={styles.plus} activeOpacity={0.8}>
          <EvilIcons name="plus" size={32} color="#FF6C00" />
        </TouchableOpacity>
      </View>
      <Title title="Реєстрація" />
      <View style={styles.inputsWrap}>
        <Input placeholder="Логін" setIsKeyboardShown={setIsKeyboardShown} />
        <Input
          placeholder="Адреса електронної пошти"
          setIsKeyboardShown={setIsKeyboardShown}
        />
        <Input
          placeholder="Пароль"
          isPassword
          setIsKeyboardShown={setIsKeyboardShown}
        />
      </View>
      <Button btnText="Зареєстуватися" />
      <Text style={styles.navText}>Вже є акаунт? Увійти</Text>
    </SharedStartScreenWrap>
  );
}

const styles = StyleSheet.create({
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
  inputsWrap: {
    marginBottom: 43,
    marginTop: 32,
    gap: 16,
  },
  navText: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
    marginTop: 16,
  },
});
