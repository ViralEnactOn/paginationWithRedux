import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  limit: 10,
  skip: 0,
};

export const apiData = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action) => {
      if (state.data === null) {
        state.data = action.payload;
      } else {
        state.data = [...state.data, ...action.payload];
      }
    },
    skipData: (state, action) => {
      state.skip = action.payload;
    },
  },
});

export const { addData, skipData } = apiData.actions;

export default apiData.reducer;
