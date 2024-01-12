// src/models/Strategy.ts
import mongoose, { Document, Schema } from "mongoose";
import { IStrategy, ITradeStats, TradeSequenceDetail } from "./types";
import Library from "../library/model";

const tradeDetailsSchema = new Schema<ITradeStats>(
  {
    winCountValue: { type: Number, default: 1 },
    lossCountValue: { type: Number, default: 1 },
    initialBalance: { type: Number, default: 10000 },
    // totalTrades: Number,
    // totalLossesPercent: Number,
    // totalWinningsPercent: Number,
    // totalLosses: { type: Number, default: 0 },
    // totalWinnings: { type: Number, default: 0 },
    // percentageWin: Number,
    // profitGain: { type: Number, default: 0 },
    // profitFactor: { type: Number, default: 0 },
    tradesSequence: [
      {
        asset: { type: String, default: "EURUSD" },
        value: { type: Number, required: true },
        commission: { type: Number, default: 0 },
        direction: {
          type: String,
          enum: ["LONG", "SHORT"],
          required: true,
          default: "LONG",
        },
      },
    ],
    // growth: [
    //   {
    //     asset: { type: String, default: "EURUSD" },
    //     value: { type: Number, required: true },
    //     direction: {
    //       type: String,
    //       enum: ["LONG", "SHORT"],
    //       required: true,
    //       default: "LONG",
    //     },
    //   },
    // ],
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

function calculateGrowth(
  tradeSequence: TradeSequenceDetail[]
): TradeSequenceDetail[] {
  let cumulativeSum = 0;

  const growthArray: TradeSequenceDetail[] = tradeSequence.map((trade) => {
    cumulativeSum += trade.value;

    // Randomly choose a direction for demonstration purposes
    const direction = Math.round(Math.random()) === 0 ? "LONG" : "SHORT";

    return {
      asset: trade.asset,
      value: Number(cumulativeSum),
      direction: trade.direction,
      commission: trade.commission,
    };
  });

  return growthArray;
}

tradeDetailsSchema.virtual("totalLosses").get(function () {
  return this.tradesSequence.filter((trade) => trade.value < 0).length;
});
tradeDetailsSchema.virtual("totalWinnings").get(function () {
  return this.tradesSequence.filter((trade) => trade.value > 0).length;
});
tradeDetailsSchema.virtual("profitGain").get(function () {
  const totalWinnings = this.tradesSequence.reduce(
    (total, trade) => (trade.value > 0 ? total + trade.value : total),
    0
  );
  const totalLosses = this.tradesSequence.reduce(
    (total, trade) => (trade.value < 0 ? total + Math.abs(trade.value) : total),
    0
  );
  return totalWinnings - totalLosses;
});
tradeDetailsSchema.virtual("profitFactor").get(function () {
  const totalWinnings = this.tradesSequence.reduce(
    (total, trade) => (trade.value > 0 ? total + trade.value : total),
    0
  );
  const totalLosses = this.tradesSequence.reduce(
    (total, trade) => (trade.value < 0 ? total + Math.abs(trade.value) : total),
    0
  );
  return totalLosses !== 0 ? totalWinnings / totalLosses : 0;
});

tradeDetailsSchema.virtual("percentageWin").get(function () {
  const denominator = this.totalLosses + this.totalWinnings;

  const winPercentage =
    denominator !== 0
      ? Math.round((this.totalWinnings / denominator) * 100)
      : 0;
  return winPercentage;
});
tradeDetailsSchema.virtual("totalTrades").get(function () {
  return this.tradesSequence.length;
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
tradeDetailsSchema.virtual("growth").get(function () {
  const growth = calculateGrowth(this.tradesSequence);
  return growth;
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
