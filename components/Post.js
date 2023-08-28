import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Image, Text } from "react-native";

export default Post = ({ post }) => {
  const { postName, location, photo } = post.item.data;

  const navigation = useNavigation();

  return (
    <View>
      <Image style={styles.image} source={{ uri: photo }} />
      <Text style={styles.title}>{postName}</Text>
      <View style={styles.info}>
        <View style={styles.comments}>
          <Feather
            name="message-circle"
            size={24}
            color="#BDBDBD"
            onPress={() => {
              console.log("comme");
              navigation.navigate("Comments");
            }}
          />
          <Text style={styles.commentsNumber}>0</Text>
        </View>
        <View style={styles.location}>
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            onPress={() => navigation.navigate("Map", post.item.data)}
          />
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    marginVertical: 8,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  comments: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  commentsNumber: {
    color: "#BDBDBD",
    fontSize: 16,
  },
  location: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  locationText: {
    color: "#212121",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
