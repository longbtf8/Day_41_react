import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery,
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `/products`,
    }),
  }),
});
export const { useGetProductQuery } = productApi;
