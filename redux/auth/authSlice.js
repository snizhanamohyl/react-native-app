import { createSlice } from "@reduxjs/toolkit";

import { register, login, logout, onAuthChanged } from "./authOperations";

const initialState = {
  user: {
    name: null,
    email: null,
    accessToken: null,
    uid: null,
  },
  stateChanged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState(state, action) {
      console.log("🚀 ~ file: authSlice.js:21 ~ action:", action);
      state.user = action.payload;
      state.stateChanged = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.stateChanged = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.stateChanged = true;
      })
      // .addCase(onAuthChanged.fulfilled, (state, action) => {
      //   console.log("action.payload", action.payload);
      //   state.user = action.payload;
      //   state.stateChanged = true;
      // })
      .addCase(logout.fulfilled, (state) => {
        state.user = initialState.user;
        state.stateChanged = false;
      });
  },
});

export default authSlice;
export const { updateAuthState } = authSlice.actions;
