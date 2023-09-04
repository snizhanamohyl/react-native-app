import { View, Image, TextInput, FlatList, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import Button from "../components/Button";
import Comment from "../components/Comment";

import { db } from "../firebase/config";
import { dateSorting } from "../helpers/dateSorting";

export default CommentsScreen = ({ route }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const { name, uid, photoURL } = useSelector((state) => state.auth.user);

  const {
    id,
    data: { photo },
  } = route.params;

  const getAllComments = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "posts", `${id}`, "comments")
      );
      const comments = [];

      snapshot.forEach((doc) => {
        comments.push({ id: doc.id, data: doc.data() });
      });

      return comments;
    } catch (error) {
      console.log(error);
    }
  };

  const sortByDate = () => {
    return comments.length > 1
      ? comments.sort((a, b) => {
          const dateA = a.data.createdAt.seconds;
          const dateB = b.data.createdAt.seconds;

          return dateSorting(dateA, dateB);
        })
      : comments;
  };

  useEffect(() => {
    (async () => {
      const storedComments = await getAllComments();

      setComments(storedComments);
    })();
  }, []);

  const uploadComment = async () => {
    if (!commentText) return;

    const commentData = {
      comment: commentText,
      user: { name, uid, photoURL },
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "posts", `${id}`, "comments"), commentData);
      setCommentText("");

      const storedComments = await getAllComments();

      setComments(storedComments);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.wrap}>
      <Image style={styles.image} source={{ uri: photo }} />
      <FlatList
        data={sortByDate(comments)}
        renderItem={(comment) => {
          return <Comment comment={comment} />;
        }}
        keyExtractor={(comment) => comment.id}
        ItemSeparatorComponent={<View style={{ height: 24 }}></View>}
      />
      <View style={styles.sendWrap}>
        <TextInput
          style={{
            ...styles.input,
            fontFamily: commentText ? "Roboto-Regular" : "Roboto-Medium",
          }}
          placeholder="Коментувати..."
          placeholderTextColor="#BDBDBD"
          value={commentText}
          onChangeText={setCommentText}
        />
        <Button
          btnText={<Feather name="arrow-up" size={24} color="#FFFFFF" />}
          onPress={uploadComment}
          customStyles={{
            width: 36,
            height: 36,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 32,
  },
  sendWrap: {
    height: 50,
    backgroundColor: "#F6F6F6",
    paddingRight: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 16,
    fontSize: 16,
    justifyContent: "center",
    color: "#212121",
  },
});
