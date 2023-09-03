import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export const getAllPosts = createAsyncThunk(
  "posts/getAll",
  async (_, thunkAPI) => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const posts = [];

      snapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          data: {
            ...doc.data(),
            createdAt: doc.data().createdAt.seconds,
          },
        });
      });

      return posts;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
