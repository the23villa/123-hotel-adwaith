/**
 * Title: Write a program using JavaScript on RentSlice
.
 * Date: 18, November 2023
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const rentSlice = createSlice({
  name: "rent",
  initialState,
  reducers: {
    setRent: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setRent } = rentSlice.actions;
export default rentSlice.reducer;
