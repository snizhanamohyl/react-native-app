import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default Button = ({ btnText, onPress, isDisabled }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.btn,
        backgroundColor: isDisabled ? "#F6F6F6" : "#FF6C00",
      }}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text
        style={{
          ...styles.btnText,
          color: isDisabled ? "#BDBDBD" : "#ffffff",
        }}
      >
        {btnText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 100,
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
});
