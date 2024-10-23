import { createSlice } from "@reduxjs/toolkit";
import { getAllEvents } from "../action/action";

const initialState = {
  data: [],
  isLoading: false,
  success: null,
  error: null,
};

const eventSlice = createSlice({
  name: "Event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllEvents.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      state.data = action.payload;
      state.success = true;
      state.isLoading = false;
    });
    builder.addCase(getAllEvents.rejected, (state, action) => {
      state.success = false;
      state.error = action.payload;
    });
  },
});

export default eventSlice.reducer;
