// src/models/Strategy.ts
import mongoose, { Document, Schema } from "mongoose";
import { IStrategy, ITradeStats } from "./types";
import Library from "../library/model";

const tradeDetailsSchema = new Schema<ITradeStats>(
  {
    winCountValue: { type: Number, required: true, default: 1 },
    lossCountValue: { type: Number, required: true, default: 1 },
    // totalTrades: Number,
    // totalLossesPercent: Number,
    // totalWinningsPercent: Number,
    totalLosses: Number,
    totalWinnings: Number,
    // percentageWin: Number,
    profitGain: { type: Number, default: 0 },
    profitFactor: { type: Number, default: 0 },
    tradesSequence: [Number],
    growth: [Number],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const strategySchema = new Schema<IStrategy>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    history: { type: [{ type: Schema.Types.Mixed }] },
    library_id: { type: Schema.Types.ObjectId, ref: "Library" },
    tradeStats: tradeDetailsSchema,
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

tradeDetailsSchema.virtual("percentageWin").get(function () {
  return Math.round(
    (this.totalWinnings / (this.totalLosses + this.totalWinnings)) * 100
  );
});
tradeDetailsSchema.virtual("totalTrades").get(function () {
  return this.totalLosses + this.totalWinnings;
});
tradeDetailsSchema.virtual("totalLossesPercent").get(function () {
  return Math.round(
    (this.totalLosses / (this.totalLosses + this.totalWinnings)) * 100
  );
});
tradeDetailsSchema.virtual("totalWinningsPercent").get(function () {
  return Math.round(
    (this.totalWinnings / (this.totalLosses + this.totalWinnings)) * 100
  );
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
