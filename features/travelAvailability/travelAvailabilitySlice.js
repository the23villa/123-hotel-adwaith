/**
 * Title: Write a program using JavaScript on TravelAvailabilitySlice
.
 * Date: 18, August 2023
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const travelAvailabilitySlice = createSlice({
  name: "travelAvailabilitySlice",
  initialState,
  reducers: {
    addTravelAvailability: (state, { payload }) => {
      Object.assign(state, payload);
    },
  },
});

export const { addTravelAvailability } = travelAvailabilitySlice.actions;
export default travelAvailabilitySlice.reducer;
