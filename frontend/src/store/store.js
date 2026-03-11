import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth/authSlice.js";
import noteReducer from "../store/notes/noteSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer,
  },
});
