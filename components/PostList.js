import { StyleSheet, FlatList, View, Text } from "react-native";

import Post from "./Post";

export default PostList = ({ posts, defaultText = "No posts" }) => {
  return (
    <>
      {posts && posts.length > 0 ? (
        <FlatList
          style={styles.list}
          data={posts}
          keyExtractor={(post) => {
            return post?.id;
          }}
          renderItem={(post) => <Post post={post} />}
          ItemSeparatorComponent={<View style={{ height: 32 }}></View>}
        ></FlatList>
      ) : (
        <Text style={styles.plug}>{defaultText}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: "column",
    gap: 32,
    marginTop: 32,
  },
  plug: {
    marginTop: 24,
    textAlign: "center",
    color: "#BDBDBD",
    fontSize: 16,
  },
});
