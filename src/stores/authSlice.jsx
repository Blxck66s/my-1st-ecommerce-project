// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     isLogged: localStorage.getItem("token") ? true : false,
//   },
//   reducers: {
//     userWritter: (state, action) => {
//       state.user = action.payload;
//     },
//     logSwitcher: (state, action) => {
//       state.isLogged = action.payload;
//     },
//   },
// });

// export default authSlice.reducer;
// export const { userWritter, logSwitcher, userSession } = authSlice.actions;

// export const login = (input) => async (dispatch) => {
//   const res = await axios.post("http://localhost:3001/auth/login", input);
//   localStorage.setItem("token", res.data.token);
//   dispatch(logSwitcher(localStorage.getItem("token") ? true : false));
//   return res;
// };

// export const logout = () => async (dispatch) => {
//   localStorage.removeItem("token");

//   dispatch(userWritter(null));
//   dispatch(logSwitcher(localStorage.getItem("token") ? true : false));
// };

// export const register = (input) => async (dispatch) => {
//   const res = await axios.post("http://localhost:3001/auth/register", input);
//   localStorage.setItem("token", res.data.token);
//   dispatch(userWritter(res.data.user));

//   dispatch(logSwitcher(localStorage.getItem("token") ? true : false));
//   return res;
// };

// export const getuser = () => async (dispatch) => {
//   const res = await axios.get("http://localhost:3001/auth/getuser", {
//     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   });
//   dispatch(userWritter(res.data.user));
// };
