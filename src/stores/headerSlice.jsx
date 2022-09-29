import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "header",
  initialState: { mode: false },
  reducers: {
    modeSwitcher: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export default headerSlice.reducer;
export const { modeSwitcher } = headerSlice.actions;
