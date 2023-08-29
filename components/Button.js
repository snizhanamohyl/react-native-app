import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default Button = ({
  btnText,
  onPress,
  isDisabled,
  customStyles = {},
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.btn,
        backgroundColor: isDisabled ? "#F6F6F6" : "#FF6C00",
        ...customStyles,
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
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  btnText: {
    fontSize: 16,
  },
});
