import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { modalActive: false },
  reducers: {
    modalSwitcher: (state, action) => {
      state.modalActive = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { modalSwitcher } = modalSlice.actions;
