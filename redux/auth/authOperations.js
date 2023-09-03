import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
  "auth/register",
  async (
    { email: userEmail, password, avatarURL, name: userName },
    thunkAPI
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail, password);
    } catch (error) {
      console.error("create", error);
      return thunkAPI.rejectWithValue(error.message);
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: avatarURL,
      });

      const {
        email,
        displayName: name,
        accessToken,
        uid,
        photoURL,
      } = auth.currentUser;

      return { email, name, accessToken, uid, photoURL };
    } catch (error) {
      console.error("update", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email: userEmail, password }, thunkAPI) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );

      const { email, displayName: name, accessToken, uid, photoURL } = user;

      return { email, name, accessToken, uid, photoURL };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const update = createAsyncThunk(
  "auth/update",
  async (dataToUpdate, thunkAPI) => {
    const user = auth.currentUser;

    if (user) {
      try {
        await updateProfile(user, dataToUpdate);

        return dataToUpdate;
      } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);

    return { message: "Logout success" };
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export const register =
//   ({ email, password, name }) =>
//   async (dispatch, getState) => {
//     try {
//       //   console.log(email);
//       const user = await createUserWithEmailAndPassword(auth, email, password);
//       console.log("🚀 ~ file: authOperations.js:22 ~ user:", user);
//     } catch (error) {
//       console.log(error);
//     }
//   };
