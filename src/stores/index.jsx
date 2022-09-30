import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import headerReducer from "./headerSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: { header: headerReducer, modal: modalReducer, auth: authSlice },
});
