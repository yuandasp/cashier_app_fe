import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [
      {
        id_product: "",
        name: "",
        price: 0,
        image: "",
        description: "",
        is_active: "",
        id_user: "",
        id_category: "",
      },
    ],
  },
  reducers: {
    setProducts: (state, action) => {
      //   console.log("action", action);
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
