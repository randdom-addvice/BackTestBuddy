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
    undoLastTradeUpdate: (state) => {
      // Create copies of arrays and objects to avoid direct modification
      const copiedTempStrategyStats = [...state.tempStrategyStatsToUpdate];
      const copiedSelectedMetrixTradeSequence = [
        ...(state.selectedStrategyMetrix?.tradeStats.tradesSequence ?? [])
      ];
      const copiedSelectedMetrix = {
        ...state.selectedStrategyMetrix as Strategy
      };

      // Remove the last item from the copied arrays
      copiedSelectedMetrixTradeSequence.pop();
      copiedTempStrategyStats.pop();

      // Update the copied object with the modified arrays
      if (copiedSelectedMetrix.tradeStats) {
        copiedSelectedMetrix.tradeStats.tradesSequence = copiedSelectedMetrixTradeSequence;
      }

      // Return the updated state
      state.tempStrategyStatsToUpdate = copiedTempStrategyStats;
      state.selectedStrategyMetrix = copiedSelectedMetrix;
    },
    resetTempStrategyStatsToUpdate: (state) => {
      return {
        ...state,
        tempStrategyStatsToUpdate: [],
      };
    },
  },
});

export const strategyActions = strategy.actions;

export default strategy.reducer;
