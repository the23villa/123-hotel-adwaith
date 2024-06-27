import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  dateRange: { startDate: null, endDate: null },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },

    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },

    resetFilter: (state) => {
      state.countries = [];
      state.dateRange = { startDate: null, endDate: null };
    },
  },
});

export const {
  setCountries,
  setDateRange,
  resetFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
