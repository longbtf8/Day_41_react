import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./features/product/productSlice";
import { productApi } from "./services/product";
export const store = configureStore({
  reducer: {
    product: ProductReducer,
  },
});
console.log(productApi);
