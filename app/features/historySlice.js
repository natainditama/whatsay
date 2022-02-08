import { createSlice } from "@reduxjs/toolkit";

export const historySlice = createSlice({
  name: "history",
  initialState: {
    histories: [],
  },
  reducers: {
    fetchHistories: (state) => {
      if (typeof window != undefined) {
        const data = JSON.parse(localStorage.getItem("histories")) ?? [];
        state.contacts = data;
      }
    },
    addHistories: (state, action) => {
      state.histories.push(action.payload);
      localStorage.setItem("histories", JSON.stringify([...state.histories]));
    },
    resetHistories: (state) => {
      state.histories = [];
      localStorage.setItem("histories", JSON.stringify([]));
    },
  },
});

export const { fetchHistories, addHistories, resetHistories } =
  historySlice.actions;
export default historySlice.reducer;
