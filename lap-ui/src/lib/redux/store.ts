import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import loanReducer from "./slices/loanSlice";

export const store = configureStore({
  reducer: {
    loan: loanReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
