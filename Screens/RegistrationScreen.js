import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { register } from "../redux/auth/authOperations";

import Title from "../components/Title";
import StartInput from "../components/StartInput";
import Button from "../components/Button";

export default function RegistrationScreen({ setIsKeyboardShown }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onSubmit = () => {
    const userData = { name, email, password };

    dispatch(register(userData));
  };

  return (
    <>
      <View style={styles.avatarWrap}>
        <Image style={styles.avatar} source={""} />
        <TouchableOpacity style={styles.plus} activeOpacity={0.8}>
          <EvilIcons name="plus" size={32} color="#FF6C00" />
        </TouchableOpacity>
      </View>
      <Title title="Реєстрація" />
      <View style={styles.inputsWrap}>
        <StartInput
          placeholder="Логін"
          setIsKeyboardShown={setIsKeyboardShown}
          onChangeText={setName}
        />
        <StartInput
          placeholder="Адреса електронної пошти"
          setIsKeyboardShown={setIsKeyboardShown}
          onChangeText={setEmail}
        />
        <StartInput
          placeholder="Пароль"
          isPassword
          setIsKeyboardShown={setIsKeyboardShown}
          onChangeText={setPassword}
        />
      </View>
      <Button btnText="Зареєстуватися" onPress={onSubmit} />
      <Text style={styles.navText}>
        Вже є акаунт?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Увійти
        </Text>
      </Text>
    </>
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
  link: {
    textDecorationLine: "underline",
  },
});
