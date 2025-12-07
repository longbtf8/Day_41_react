import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
export const productApi = createApi({
  tagTypes: ["Product"],
  reducerPath: "productApi",
  baseQuery,
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (page = 1) => `/products?page=${page}`,
    }),
    addProduct: builder.mutation({
      query: (newPost) => ({
        url: "/products",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
export const { useGetProductQuery, useAddProductMutation } = productApi;
