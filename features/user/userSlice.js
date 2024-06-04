/**
 * Title: Write a program using JavaScript on UserSlice
.
 * Date: 17, November 2023
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
