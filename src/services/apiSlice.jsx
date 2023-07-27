import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints: (builder) => ({
    addNewPost: builder.mutation({
      query: (payload) => ({
        url: `/todos?limit=${payload.limit}&skip=${payload.skip}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});
export const { useAddNewPostMutation } = apiSlice;
