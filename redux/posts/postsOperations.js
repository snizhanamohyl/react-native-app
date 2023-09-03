import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
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

export const addNewPost = createAsyncThunk(
  "posts/add",
  async (postData, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        ...postData,
        createdAt: serverTimestamp(),
      });

      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.id,
          data: {
            ...docSnapshot.data(),
            createdAt: docSnapshot.data().createdAt.seconds,
          },
        };
      } else {
        console.log("Document doesn't exist.");
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
