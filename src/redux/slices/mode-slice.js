import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    getMode: (state) => {
      if (typeof window != undefined) {
        const current = JSON.parse(localStorage.getItem("theme")) ?? state.mode;
        state.mode = current;
      }
    },
    setMode: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },
  },
});

export const { getMode, setMode } = modeSlice.actions;
export default modeSlice.reducer;
