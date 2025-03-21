import { configureStore } from "@reduxjs/toolkit";
import chatSliceReducer from "./slice";

export const store = configureStore({
  reducer: {
    chat: chatSliceReducer,
  },
});
