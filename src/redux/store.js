import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/slices/CounterSlice";
import cartReducer from "../redux/slices/CartSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },
});
