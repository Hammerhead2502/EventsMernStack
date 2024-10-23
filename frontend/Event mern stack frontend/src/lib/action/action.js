import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllEvents = createAsyncThunk(
  "event",
  async (args, { rejectedWithValue }) => {
    try {
      const data = axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-events`);
      return data;
    } catch (err) {
      return rejectedWithValue(err);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart",
  async (args, { rejectedWithValue }) => {
    try {
      const data = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/get-cart`, {
        userID: args,
      });
      return data;
    } catch (err) {
      return rejectedWithValue(err);
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "order",
  async (args, { rejectedWithValue }) => {
    try {
      const data = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/get-orders`, {
        userID: args,
      });
      return data;
    } catch (err) {
      return rejectedWithValue(err);
    }
  }
);
