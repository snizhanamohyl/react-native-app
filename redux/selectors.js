export const selectUser = (state) => state.auth.user;

export const selectPosts = (state) => state.posts;

export const selectUserPosts = (state) => {
  const currentUserId = state.auth.user.uid;

  return state.posts.filter((post) => post.data.userId === currentUserId);
};
