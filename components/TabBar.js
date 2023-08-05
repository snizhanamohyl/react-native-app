import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TabBar({}) {
  const navigation = useNavigation();

  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        style={styles.navItem}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Posts")}
      >
        <Feather name="grid" size={24} color="#212121" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Create")}
      >
        <Feather name="plus" size={24} color={"#fff"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Profile")}
      >
        <Feather name="user" size={24} color="#212121" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 31,
    paddingVertical: 9,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0, 0, 0, 0.3)",
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 40,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  navItem: {
    padding: 8,
  },
});
