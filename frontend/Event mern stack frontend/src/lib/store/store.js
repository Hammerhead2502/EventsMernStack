import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../slices/eventSlice";
import cartReducer from "../slices/cartSlice";
import orderReducer from "../slices/orderSlice";

const store = configureStore({
  reducer: {
    event: eventReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
