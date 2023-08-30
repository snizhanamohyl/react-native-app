import { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

// import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase/config";

import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/posts/postsOperations";
import PostList from "../components/PostList";

export default PostsScreen = ({ route }) => {
  // const [posts, setPosts] = useState([]);
  // console.log("🚀 d~ file: bhPostsScreen.js:12 ~ posts:", posts);
  console.log(",fdfdfddfGcFff");

  const { name, email } = useSelector((state) => state.auth.user);

  // const getAllPosts = async () => {
  //   try {
  //     const snapshot = await getDocs(collection(db, "posts"));
  //     const posts = [];

  //     snapshot.forEach((doc) => {
  //       posts.push({ id: doc.id, data: doc.data() });
  //       console.log(`${doc.id} =>`, doc.data());
  //     });

  //     return posts;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  // useEffect(() => {
  //   if (posts.length !== 0 && !route.params) return;

  //   (async () => {
  //     const posts = await getAllPosts();
  //     if (posts.length === 0) return;

  //     setPosts(posts);
  //   })();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userWrap}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w",
          }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <PostList posts={posts} defaultText="No posts founded" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    flex: 1,
  },
  userWrap: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  avatar: {
    borderRadius: 16,
    width: 60,
    height: 60,
    overflow: "hidden",
  },
  name: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  email: {
    color: "rgba(33, 33, 33, 0.80)",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
});
