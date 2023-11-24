// src/models/Strategy.ts
import { Document, Schema } from "mongoose";

export interface ITradeDetails {
  totalTrades: number;
  totalLossesPercent: number;
  totalWinningsPercent: number;
  totalLosses: number;
  totalWinnings: number;
  percentageWin: number;
  profitGain: number;
  tradesSequence: number[];
  growth: number[];
}

export interface IStrategy extends Document {
  _id: Schema.Types.ObjectId | string;
  name: string;
  description: string;
  id: number;
  history: any[]; // Adjust the type based on the actual structure of your history field
  tradeDetails: ITradeDetails;
}

export interface IGraphQLResolverArgs {
  [key: string]: any;
}
