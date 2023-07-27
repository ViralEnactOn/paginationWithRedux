import * as toolkit from "@reduxjs/toolkit";
import * as query from "@reduxjs/toolkit/query";
import { apiSlice } from "../services/apiSlice";
import apiData from "../services/dataStore";

export const store = toolkit.configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    apiData: apiData,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
query.setupListeners(store.dispatch);
