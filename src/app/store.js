import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user/userSlice";
import productReducer from "../feature/product/productSlice";
import categoryReducer from "../feature/category/categorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
  },
});
