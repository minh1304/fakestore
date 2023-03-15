import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
      allCart: cartReducer,
      user: userReducer ,
    },
  });