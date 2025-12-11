import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
export const productApi = createApi({
  tagTypes: ["Product"],
  reducerPath: "productApi",
  baseQuery,
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (page = 1) => `/products?page=${page}`,
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (newPost) => ({
        url: "/products",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
