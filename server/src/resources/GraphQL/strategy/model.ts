// src/models/Strategy.ts
import mongoose, { Document, Schema } from "mongoose";
import { IStrategy, ITradeStats } from "./types";
import Library from "../library/model";

const tradeDetailsSchema = new Schema<ITradeStats>(
  {
    winCountValue: { type: Number, default: 1 },
    lossCountValue: { type: Number, default: 1 },
    initialBalance: { type: Number, default: 10000 },
    // totalTrades: Number,
    // totalLossesPercent: Number,
    // totalWinningsPercent: Number,
    totalLosses: { type: Number, default: 0 },
    totalWinnings: { type: Number, default: 0 },
    // percentageWin: Number,
    profitGain: { type: Number, default: 0 },
    profitFactor: { type: Number, default: 0 },
    tradesSequence: [Number],
    growth: [
      {
        asset: { type: String, default: "EURUSD" },
        value: { type: Number, required: true },
      },
    ],
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
  const denominator = this.totalLosses + this.totalWinnings;

  const winPercentage =
    denominator !== 0
      ? Math.round((this.totalWinnings / denominator) * 100)
      : 0;
  return winPercentage;
});
tradeDetailsSchema.virtual("totalTrades").get(function () {
  return this.totalLosses + this.totalWinnings;
});
tradeDetailsSchema.virtual("totalLossesPercent").get(function () {
  const denominator = this.totalLosses + this.totalWinnings;

  const lossPercentage =
    denominator !== 0 ? Math.round((this.totalLosses / denominator) * 100) : 0;
  return lossPercentage;
});
tradeDetailsSchema.virtual("totalWinningsPercent").get(function () {
  const denominator = this.totalLosses + this.totalWinnings;

  const winPercentage =
    denominator !== 0
      ? Math.round((this.totalWinnings / denominator) * 100)
      : 0;
  return winPercentage;
});
tradeDetailsSchema.virtual("balance").get(function () {
  const { initialBalance, profitGain } = this;
  const gainMultiplier = 1 + profitGain / 100;
  const balance = initialBalance * gainMultiplier;
  return balance;
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
