import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Strategy } from "@/graphql/api";

interface StrategyState {
  selectedStrategyMetrix: Strategy | null;
}

const initialState: StrategyState = {
  selectedStrategyMetrix: null,
};

export const strategy = createSlice({
  name: "strategy",
  initialState,
  reducers: {
    setSelectedStrategyMetrix: (state, action: PayloadAction<Strategy>) => {
      return { ...state, selectedStrategyMetrix: action.payload };
    },
  },
});

export const strategyActions = strategy.actions;

export default strategy.reducer;
