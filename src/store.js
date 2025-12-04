import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./features/product/productSlice";
import { productApi } from "./services/product";
console.log(productApi);

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    productApi.middleware,
  ],
});
