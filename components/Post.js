import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, getCountFromServer } from "firebase/firestore";
import { StyleSheet, View, Image, Text } from "react-native";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export default Post = ({ post }) => {
  const [commentsNumber, setCommentsNumber] = useState(0);

  const { postName, location, photo } = post.item.data;

  const navigation = useNavigation();

  const navigateToComments = () => {
    navigation.navigate("Comments", post.item);
  };

  const navigateToMap = () => {
    navigation.navigate("Map", post.item.data);
  };

  const getCommentsNumber = async () => {
    const coll = collection(db, "posts", `${post.item.id}`, "comments");
    const snapshot = await getCountFromServer(coll);

    return snapshot.data().count;
  };

  useEffect(() => {
    (async () => {
      const number = await getCommentsNumber();

      setCommentsNumber(number);
    })();
  }, []);

  return (
    <View>
      <Image style={styles.image} source={{ uri: photo }} />
      <Text style={styles.title}>{postName}</Text>
      <View style={styles.info}>
        <View style={styles.comments}>
          <Feather
            name="message-circle"
            size={24}
            color={commentsNumber === 0 ? "#BDBDBD" : "#FF6C00"}
            onPress={navigateToComments}
          />
          <Text
            style={{
              ...styles.commentsNumber,
              color: commentsNumber === 0 ? "#BDBDBD" : "#212121",
            }}
          >
            {commentsNumber}
          </Text>
        </View>
        <View style={styles.location}>
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            onPress={navigateToMap}
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
