import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "./postsOperations";

const initialState = [];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export default postsSlice;
