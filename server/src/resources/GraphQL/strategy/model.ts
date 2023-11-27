// src/models/Strategy.ts
import mongoose, { Document, Schema } from "mongoose";
import { IStrategy, ITradeDetails } from "./types";
import Library from "../library/model";

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
  history: { type: [{ type: Schema.Types.Mixed }] },
  library_id: { type: Schema.Types.ObjectId, ref: "Library" },
  tradeDetails: tradeDetailsSchema,
});

strategySchema.post<IStrategy>(
  "findOneAndDelete",
  async function (doc: IStrategy | null) {
    if (doc) {
      try {
        // Remove the strategy ID from the associated library's strategies array
        await Library.findByIdAndUpdate(doc.library_id, {
          $pull: { strategies: doc._id },
        });
      } catch (error) {
        console.error("Error removing strategy from library:", error);
      }
    }
  }
);

const Strategy = mongoose.model<IStrategy>("Strategy", strategySchema);

export default Strategy;
