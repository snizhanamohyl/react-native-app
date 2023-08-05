import { StyleSheet, Text, View } from "react-native";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import { SharedStartScreenWrap } from "../components/SharedStartScreenWrap";

export default function LoginScreen() {
  return (
    <SharedStartScreenWrap wrapStyle={styles.loginWrap}>
      <Title title="Увійти" />
      <View style={styles.inputsWrap}>
        <Input placeholder="Адреса електронної пошти" />
        <Input placeholder="Пароль" isPassword />
      </View>
      <Button btnText="Увійти" />
      <Text style={styles.navText}>
        Немає акаунту? <Text style={styles.link}>Зареєструватися</Text>
      </Text>
    </SharedStartScreenWrap>
  );
}

const styles = StyleSheet.create({
  loginWrap: {
    paddingTop: 32,
    paddingBottom: 111,
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
