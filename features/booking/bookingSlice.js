/**
 * Title: Write a program using JavaScript on BookingInfoSlice
.
 * Date: 07, February 2024
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const bookingSlice = createSlice({
  name: "bookingInfo",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
