import { createSlice } from "@reduxjs/toolkit";

import { register, login } from "./authOperations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.email = action.payload.email;
        // state.token = action.payload.token;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("🚀 ~ file: authSlice.js:23 ~ .addCase ~ state:", state);
        // state.isLoading = false;
        state.email = action.payload.email;
        // state.token = action.payload.token;
      });
  },
});

export default authSlice;
