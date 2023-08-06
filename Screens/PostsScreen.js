import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Post from "../components/Post";

export default PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!route.params) return;

    setPosts((prevState) =>
      posts.find((post) => route.params.photoURI === post.photoURI)
        ? prevState
        : [...prevState, route.params]
    );
  }, [route.params]);

  return (
    <View style={styles.container}>
      {posts && posts.length > 0 && (
        <FlatList
          style={styles.list}
          data={posts}
          keyExtractor={(post) => {
            return post?.photoURI;
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
