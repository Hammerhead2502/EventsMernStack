import { createSlice } from "@reduxjs/toolkit";
import { getCartItems } from "../action/action";

const initialState = {
  data: [],
  isLoading: false,
  success: null,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state.success = false;
      state.error = action.payload;
    });
  },
});

export default cartSlice.reducer;
