import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  getAuth,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
  "auth/register",
  async ({ email: userEmail, password, name: userName }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail, password);

      await updateProfile(auth.currentUser, {
        displayName: userName,
      });

      const { email, displayName: name, accessToken, uid } = auth.currentUser;

      return { email, name, accessToken, uid };
    } catch (error) {
      console.error(error);
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

      const { email, displayName: name, accessToken, uid } = user;

      return { email, name, accessToken, uid };
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

        return auth.currentUser;
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

export const onAuthChanged = createAsyncThunk(
  "auth/stateChanged",
  async (_, thunkAPI) => {
    await onAuthStateChanged(auth, (user) => {
      console.log(
        "🚀 ~ file: authOperations.js:84 ~ onAuthStateChanged ~ user:",
        user
      );

      if (user) {
        const { email, displayName: name, accessToken, uid } = user;

        return { email, name, accessToken, uid };
      }
    });

    return thunkAPI.rejectWithValue({ message: "user is logged out" });
  }
);

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
