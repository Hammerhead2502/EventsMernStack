import { createSlice } from "@reduxjs/toolkit";
import { getUserOrders } from "../action/action";

const initialState = {
  data: [],
  isLoading: false,
  success: null,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.success = false;
      state.error = action.payload;
    });
  },
});

export default orderSlice.reducer;
