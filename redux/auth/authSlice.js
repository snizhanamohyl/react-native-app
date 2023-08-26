import { createSlice } from "@reduxjs/toolkit";

import { register, login, logout } from "./authOperations";

const initialState = {
  user: {
    name: null,
    email: null,
    accessToken: null,
    uid: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.user = action.payload;
        // state.token = action.payload.token;
      })
      .addCase(login.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.user = action.payload;
        // state.token = action.payload.token;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = initialState.user;
      });
  },
});

export default authSlice;
