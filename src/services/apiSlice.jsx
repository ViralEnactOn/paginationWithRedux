import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://lbp8api.enactweb.com/",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    addNewPost: builder.mutation({
      query: (payload) => ({
        url: "/public/deals",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
export const { useAddNewPostMutation } = apiSlice;
