import { configureStore } from "@reduxjs/toolkit";

import contactReducer from "./slices/contact-slice";
import historyReducer from "./slices/history-slice";
import modeReducer from "./slices/mode-slice";

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    history: historyReducer,
    mode: modeReducer,
  },
});
