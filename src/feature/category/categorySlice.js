import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [
      {
        id_category: "",
        name: "",
        id_user: "",
      },
    ],
  },
  reducers: {
    setCategories: (state, action) => {
      //   console.log("action", action);
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
