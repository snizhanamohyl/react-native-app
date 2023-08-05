import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default Button = ({ btnText }) => {
  return (
    <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
      <Text style={styles.btnText}>{btnText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    // marginBottom: 16,
  },
  btnText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
});
