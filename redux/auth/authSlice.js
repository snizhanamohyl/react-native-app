import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {},
});

export default authSlice;
