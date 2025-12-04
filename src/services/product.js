import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api01.f8team.dev/api",
  }),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `/product`,
    }),
  }),
});
export const { useGetProductQuery } = productApi;
