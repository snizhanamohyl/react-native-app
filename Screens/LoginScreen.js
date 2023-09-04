import { useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Title from "../components/Title";
import StartInput from "../components/StartInput";
import Button from "../components/Button";

import { login } from "../redux/auth/authOperations";

export default function LoginScreen({ setIsKeyboardShown }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onSubmit = () => {
    const userData = { email, password };

    dispatch(login(userData));
  };

  return (
    <>
      <Title title="Увійти" />
      <View style={styles.inputsWrap}>
        <StartInput
          placeholder="Адреса електронної пошти"
          setIsKeyboardShown={setIsKeyboardShown}
          value={email}
          onChangeText={setEmail}
        />
        <StartInput
          placeholder="Пароль"
          isPassword
          setIsKeyboardShown={setIsKeyboardShown}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button btnText="Увійти" onPress={onSubmit} />
      <Text style={styles.navText}>
        Немає акаунту?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Зареєструватися
        </Text>
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
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
