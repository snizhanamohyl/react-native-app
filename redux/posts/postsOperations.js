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
        posts.push({ id: doc.id, data: doc.data() });
        // console.log(`${doc.id} =>`, doc.data());
      });

      // if (posts.length === 0) throw new Error("No posts");

      return posts;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
