import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { JWT_TOKEN_NAMESPACE } from "@/utils/globalConstants";
import { Strategy } from "@/graphql/api";

interface AuthState {
  selectedStrategy: Strategy | null;
}

const initialState: AuthState = {
  selectedStrategy: null,
};

export const strategy = createSlice({
  name: "strategy",
  initialState,
  reducers: {
    setSelectedStrategy: (state, action: PayloadAction<Strategy>) => {
      return { ...state, selectedStrategy: action.payload };
    },
  },
});

export const strategyActions = strategy.actions;

export default strategy.reducer;
