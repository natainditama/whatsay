import { configureStore } from "@reduxjs/toolkit";
import { contactReducer, historyReducer, modeReducer } from "./features";

const store = configureStore({
  reducer: {
    contact: contactReducer,
    history: historyReducer,
    mode: modeReducer,
  },
});

export default store;
