import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "./postsOperations";

// const initialState = [];

const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      //   console.log("getAllPosts.fulfilled", action.payload);
      //   action.payload.forEach((post) => state.posts.push(post));
      state = action.payload;
    });
  },
});

export default postsSlice;
