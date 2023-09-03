import { useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/posts/postsOperations";
import PostList from "../components/PostList";
import { defaultAvatar } from "../constants/defaultAvatar";
import { dateSorting } from "../helpers/dateSorting";

export default PostsScreen = () => {
  const { name, email, photoURL } = useSelector((state) => state.auth.user);

  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const sortByDate = (posts) => {
    const postsCopy = [...posts];

    return postsCopy.length > 1
      ? postsCopy.sort((a, b) => {
          const dateA = a.data.createdAt;
          const dateB = b.data.createdAt;

          return dateSorting(dateA, dateB, true);
        })
      : posts;
  };

  return (
    <View style={styles.container}>
      <View style={styles.userWrap}>
        <Image
          style={styles.avatar}
          source={{
            uri: photoURL ? photoURL : defaultAvatar,
          }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <PostList posts={sortByDate(posts)} defaultText="No posts founded" />
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
