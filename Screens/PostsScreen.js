import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";

export default PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  console.log("🚀 ~ file: bhPostsScreen.js:12 ~ posts:", posts);

  const getAllPosts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const posts = [];

      snapshot.forEach((doc) => {
        posts.push({ id: doc.id, data: doc.data() });
        console.log(`${doc.id} =>`, doc.data());
      });

      return posts;
    } catch (error) {
      console.log(error);
    }
  };

  console.log("cпfjgllv,dgfhgtmnyk");

  // const posts = useSelector((state) => state.posts);

  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllPosts());
    if (posts.length !== 0 && !route.params) return;

    (async () => {
      const posts = await getAllPosts();
      if (posts.length === 0) return;

      setPosts(posts);
    })();
  }, []);
  // }, [dispatch, getAllPosts, route]);

  return (
    <View style={styles.container}>
      {posts && posts.length > 0 && (
        <FlatList
          style={styles.list}
          data={posts}
          keyExtractor={(post) => {
            return post?.id;
          }}
          renderItem={(post) => <Post post={post} />}
          ItemSeparatorComponent={<View style={{ height: 32 }}></View>}
        ></FlatList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    flex: 1,
  },
  list: {
    flexDirection: "column",
    gap: 32,
  },
});
