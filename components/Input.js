import { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

export default Input = ({
  placeholder,
  isPassword = false,
  setIsKeyboardShown,
  value,
  onChangeText,
}) => {
  const [isSecuredPassword, setIsSecuredPassword] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsSecuredPassword((prevState) => !prevState);
  };

  const setFocus = () => {
    setIsFocused(true);
    setIsKeyboardShown(true);
  };

  const unsetFocus = () => {
    setIsFocused(false);
  };

  return (
    <View
      style={{
        ...styles.input,
        borderColor: isFocused ? "#FF6C00" : "#E8E8E8",
        backgroundColor: isFocused ? "transparent" : "#F6F6F6",
        marginBottom: isPassword ? 0 : "",
      }}
    >
      <TextInput
        style={styles.inputText}
        secureTextEntry={isPassword ? isSecuredPassword : false}
        onFocus={() => setFocus()}
        onBlur={() => unsetFocus()}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      ></TextInput>
      {isPassword && (
        <Text style={styles.show} onPress={togglePasswordVisibility}>
          {isSecuredPassword ? "Показати" : "Сховати"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    paddingHorizontal: 16,
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
  show: {
    color: "#1B4371",
    fontSize: 16,
  },
});
