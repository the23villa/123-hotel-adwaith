/**
 * Title: Write a program using JavaScript on AuthSlice
.
 * Date: 17, November 2023
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { addUser } = authSlice.actions;
export default authSlice.reducer;
