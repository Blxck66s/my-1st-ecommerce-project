import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: {} },
  reducers: {
    userWritter: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { userWritter } = authSlice.actions;

export const login = (input) => async (dispatch) => {
  const res = await axios.post("http://localhost:3001/auth/login", input);

  localStorage.setItem("token", res.data.token);

  const ress = await axios.get("http://localhost:3001/auth/getuser", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  dispatch(userWritter(ress.data));
};
