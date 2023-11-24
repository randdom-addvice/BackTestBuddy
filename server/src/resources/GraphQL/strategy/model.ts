// src/models/Strategy.ts
import mongoose, { Document, Schema } from "mongoose";
import { IStrategy, ITradeDetails } from "./types";

const tradeDetailsSchema = new Schema<ITradeDetails>({
  totalTrades: Number,
  totalLossesPercent: Number,
  totalWinningsPercent: Number,
  totalLosses: Number,
  totalWinnings: Number,
  percentageWin: Number,
  profitGain: Number,
  tradesSequence: [Number],
  growth: [Number],
});

const strategySchema = new Schema<IStrategy>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  id: { type: Number, required: true },
  history: { type: [{ type: Schema.Types.Mixed }] },
  tradeDetails: tradeDetailsSchema,
});

const Strategy = mongoose.model<IStrategy>("Strategy", strategySchema);

export default Strategy;
