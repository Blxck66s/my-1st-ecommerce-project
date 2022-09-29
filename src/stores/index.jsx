import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./headerSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: { header: headerReducer, modal: modalReducer },
});
