import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  responseData: null,
  limit: 10,
  skip: 0,
};

export const apiData = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action) => {
      if (state.responseData === null) {
        state.responseData = action.payload;
      } else {
        state.responseData = [...state.responseData, ...action.payload];
      }
    },
    skipData: (state, action) => {
      state.skip = action.payload;
    },
  },
});

export const { addData, skipData } = apiData.actions;

export default apiData.reducer;
