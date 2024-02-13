import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  histories: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
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
