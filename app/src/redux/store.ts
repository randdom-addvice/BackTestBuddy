import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/reducers/auth/authSlice";
import strategySlice from "@/redux/reducers/strategy/strategySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    strategy: strategySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
