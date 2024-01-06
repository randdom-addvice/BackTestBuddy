import React from "react";
import { useAppSelector } from "@/redux/hooks";

const AdvancedDataMetrix = () => {
  const { tradeStats } =
    useAppSelector((state) => state.strategy.selectedStrategyMetrix) || {};

  const analysisData = [
    {
      name: "Gain",
      value: `%${tradeStats?.profitGain}`,
    },
    {
      name: "Balance",
      value: `$${tradeStats?.balance}`,
    },
    {
      name: "Profitability",
      value: `%${tradeStats?.percentageWin}`,
    },
    {
      name: "Total Trades",
      value: `${tradeStats?.totalTrades}`,
    },
    {
      name: "Total Winning",
      value: `${tradeStats?.totalWinnings}`,
    },
    {
      name: "Total Losses",
      value: `${tradeStats?.totalLosses}`,
    },
    {
      name: "Breakeven Trades",
      value: "0",
    },
  ];
  const advancedAnalysisData = [
    {
      name: "Trades",
      value: 20,
    },
    {
      name: "Trades Total",
      value: 731,
    },
    {
      name: "Profitability Pips",
      value: 1804.3,
    },
    {
      name: "Average Win Pips",
      value: 7.48,
    },
    {
      name: "Average Win Dollars",
      value: 7.49,
    },
    {
      name: "Average Loss Pips",
      value: -9.47,
    },
    {
      name: "Average Loss Dollars",
      value: -9.67,
    },
    {
      name: "Lots",
      value: 73.48,
    },
    {
      name: "Commissions",
      value: "$0.00",
    },
    {
      name: "Longs Won",
      value: "(378/527) 71%",
    },
    {
      name: "Shorts Won",
      value: "(137/204) 67%",
    },
    {
      name: "Best Trade Dollars",
      value: 103.42,
    },
    {
      name: "Best Trade Pips",
      value: 104.7,
    },
    {
      name: "Best Trade Date",
      value: "Mar 28",
    },
    {
      name: "Worst Trade Dollars",
      value: -82.22,
    },
    {
      name: "Worst Trade Pips",
      value: -80.3,
    },
    {
      name: "Worst Trade Date",
      value: "Mar 28",
    },
    {
      name: "Avg Trade Length",
      value: "7h 31m",
    },
    {
      name: "Profit Factor",
      value: 1.85,
    },
    {
      name: "Std Deviation",
      value: "$15.613",
    },
    {
      name: "Sharpe Ratio",
      value: 0,
    },
    {
      name: "Z Score Probability",
      value: -2.12,
    },
    {
      name: "Z Score Percentage",
      value: "99.99%",
    },
    {
      name: "Expectancy Pips",
      value: 2.5,
    },
    {
      name: "Expectancy Dollars",
      value: "$2.42",
    },
    {
      name: "Ahpr",
      value: "0.00%",
    },
    {
      name: "Ghpr",
      value: "0.00%",
    },
  ];
  return <div>AdvancedDataMetrix</div>;
};

export default AdvancedDataMetrix;
