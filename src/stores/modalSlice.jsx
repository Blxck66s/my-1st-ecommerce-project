import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { modalActive: false, addModalActive: false },
  reducers: {
    modalSwitcher: (state, action) => {
      state.modalActive = action.payload;
    },
    addModalSwitcher: (state, action) => {
      state.addModalActive = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { modalSwitcher, addModalSwitcher } = modalSlice.actions;
