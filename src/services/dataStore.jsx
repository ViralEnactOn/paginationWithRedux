import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
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
  },
});

export const { addData } = apiData.actions;

export default apiData.reducer;
