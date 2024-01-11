import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Strategy, TradeSequenceDetail } from "@/graphql/api";

interface StrategyState {
  selectedStrategyMetrix: Strategy | null;
  tempStrategyStatsToUpdate: TradeSequenceDetail[];
}

const initialState: StrategyState = {
  selectedStrategyMetrix: null,
  tempStrategyStatsToUpdate: [],
};

export const strategy = createSlice({
  name: "strategy",
  initialState,
  reducers: {
    setSelectedStrategyMetrix: (state, action: PayloadAction<Strategy>) => {
      return { ...state, selectedStrategyMetrix: action.payload };
    },
    setTempStrategyStatsToUpdate: (
      state,
      action: PayloadAction<TradeSequenceDetail>
    ) => {
      return {
        ...state,
        ...(state.selectedStrategyMetrix && {
          selectedStrategyMetrix: {
            ...state.selectedStrategyMetrix,
            tradeStats: {
              ...state.selectedStrategyMetrix.tradeStats,
              tradesSequence: [
                ...(state.selectedStrategyMetrix.tradeStats.tradesSequence ??
                  []),
                action.payload,
              ],
            },
          },
        }),
        tempStrategyStatsToUpdate: [
          ...state.tempStrategyStatsToUpdate,
          action.payload,
        ],
      };
    },
  },
});

export const strategyActions = strategy.actions;

export default strategy.reducer;
