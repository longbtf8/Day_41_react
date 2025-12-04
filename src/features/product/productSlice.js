import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  product: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: {},
    editProduct: {},
    deleteProduct: {},
  },
});
export { productSlice };
export const { addProduct, editProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
