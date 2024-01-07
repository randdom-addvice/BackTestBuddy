// src/models/Strategy.ts
import { Document, Schema } from "mongoose";

type Direction = "LONG" | "SHORT";
type Growth = { asset: string; value: number; direction: Direction };
export interface ITradeStats {
  initialBalance: number;
  balance: number;
  winCountValue: number;
  lossCountValue: number;
  totalTrades: number;
  totalLossesPercent: number;
  totalWinningsPercent: number;
  totalLosses: number;
  totalWinnings: number;
  percentageWin: number;
  profitGain: number;
  profitFactor: number;
  tradesSequence: Array<Growth>;
  growth: Array<Growth>;
}

export interface IStrategy extends Document {
  _id: Schema.Types.ObjectId | string;
  library_id: Schema.Types.ObjectId | string;
  name: string;
  description: string;
  id: number;
  history: any[]; // Adjust the type based on the actual structure of your history field
  tradeStats: ITradeStats;
}

export interface IGraphQLResolverArgs {
  [key: string]: any;
}
