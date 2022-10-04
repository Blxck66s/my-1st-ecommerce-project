import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: null,
  },
  reducers: {
    orderWritter: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export default orderSlice.reducer;
export const { orderWritter } = orderSlice.actions;

export const getorder = (input) => async (dispatch) => {
  const res = await axios.get("http://localhost:3001/order/getorder", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  dispatch(orderWritter(res.data.Order));
};
