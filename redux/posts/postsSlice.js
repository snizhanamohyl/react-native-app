import { createSlice } from "@reduxjs/toolkit";
import { addNewPost, getAllPosts } from "./postsOperations";

const initialState = [];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.fulfilled, (_, action) => {
        return action.payload;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        return [...state, action.payload];
      });
  },
});

export default postsSlice;
