import { StyleSheet, Text, View } from "react-native";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";

export default function LoginScreen({ setIsKeyboardShown }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    const userData = { email, password };
    console.log("userLoginData", userData);
  };

  return (
    <>
      <Title title="Увійти" />
      <View style={styles.inputsWrap}>
        <Input
          placeholder="Адреса електронної пошти"
          setIsKeyboardShown={setIsKeyboardShown}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Пароль"
          isPassword
          setIsKeyboardShown={setIsKeyboardShown}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button btnText="Увійти" onPress={onSubmit} />
      <Text style={styles.navText}>
        Немає акаунту? <Text style={styles.link}>Зареєструватися</Text>
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
