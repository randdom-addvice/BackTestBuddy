import { Direction, TradeSequenceDetail, TradeStats } from "@/graphql/api";
import { useAppSelector } from "@/redux/hooks";
import React, { useCallback, useEffect, useMemo } from "react";

function erf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = (((a5 * t + a4) * t + a3) * t + a2) * t + a1;

  return sign * (1 - y * Math.exp(-x * x));
}

const useStrategyMetrix = (tradeStats: TradeStats) => {
  const calculateAverageWinDollars = useCallback(() => {
    const initialBalance = tradeStats.initialBalance;
    const winTrades = tradeStats.tradesSequence
      .filter((trade) => trade.value > 0)
      .map((i) => ({ ...i, value: (i.value / 100) * initialBalance }));
    const totalWinDollars = winTrades.reduce(
      (total, trade) => total + trade.value,
      0
    );

    return winTrades.length > 0 ? totalWinDollars / winTrades.length : 0;
  }, [tradeStats]);

  const calculateAverageLossDollars = useCallback(() => {
    const initialBalance = tradeStats.initialBalance;
    const lossTrades = tradeStats.tradesSequence
      .filter((trade) => trade.value < 0)
      .map((i) => ({ ...i, value: (i.value / 100) * initialBalance }));
    const totalLossDollars = lossTrades.reduce(
      (total, trade) => total + trade.value,
      0
    );

    return lossTrades.length > 0 ? totalLossDollars / lossTrades.length : 0;
  }, [tradeStats]);

  const calculateWinCount = useCallback(() => {
    return tradeStats.tradesSequence.filter((trade) => trade.value > 0).length;
  }, [tradeStats]);

  const calculateLossCount = useCallback(() => {
    return tradeStats.tradesSequence.filter((trade) => trade.value < 0).length;
  }, [tradeStats]);

  const calculateBreakEvenCount = useCallback(() => {
    return tradeStats.tradesSequence.filter((i) => i.value === 0).length;
  }, [tradeStats]);

  const calculateTotalTrades = useCallback(() => {
    return tradeStats.tradesSequence.length;
  }, [tradeStats]);

  const calculateTotalWinnings = useCallback(() => {
    const wins = tradeStats.tradesSequence.filter(
      (trade) => trade.value > 0
    ).length;
    return wins;
  }, [tradeStats]);

  const calculateTotalLosses = useCallback(() => {
    const losses = tradeStats.tradesSequence.filter(
      (trade) => trade.value < 0
    ).length;
    return losses;
  }, [tradeStats]);

  const calculateWinRate = useCallback(() => {
    const rate =
      (tradeStats.tradesSequence.filter((trade) => trade.value > 0).length /
        tradeStats.tradesSequence.length) *
      100;
    return rate.toFixed(2);
  }, [tradeStats]);

  const calculateProfitGain = useCallback(() => {
    const totalGrowth = calculateGrowth().reduce((a, b) => a + b.value, 0);
    const growthPercent = (totalGrowth / tradeStats.initialBalance) * 100;
    return growthPercent.toFixed(2);
  }, [tradeStats]);

  const calculateBalance = useCallback(() => {
    const totalGrowth = calculateGrowth();
    const lastRecordedGrowth = totalGrowth[totalGrowth.length - 1]?.value ?? 0;
    const balance = (lastRecordedGrowth / 100) * tradeStats.initialBalance;
    // console.log(balance, " balancexxx");

    return balance + tradeStats.initialBalance;
  }, [tradeStats]);

  const calculateProfitFactor = useCallback(() => {
    const totalLosses = calculateTotalLosses();
    return totalLosses !== 0 ? calculateTotalWinnings() / totalLosses : 0;
  }, [calculateTotalWinnings, calculateTotalLosses]);

  const calculateAverageRiskToReward = useCallback(() => {
    const riskTrades = tradeStats.tradesSequence.filter(
      (trade) => trade.value < 0
    );
    const rewardTrades = tradeStats.tradesSequence.filter(
      (trade) => trade.value > 0
    );

    const totalRisk = riskTrades.reduce(
      (total, trade) => total + Math.abs(trade.value),
      0
    );
    const totalReward = rewardTrades.reduce(
      (total, trade) => total + Math.abs(trade.value),
      0
    );
    const averageProfit = totalReward / rewardTrades.length;
    const averageloss = totalRisk / riskTrades.length;

    return totalRisk > 0 ? averageProfit / averageloss : 0;
  }, [tradeStats]);

  const calculateLongsWonPercentage = useCallback(() => {
    const totalTrades = tradeStats.totalTrades;
    const longWins = tradeStats.tradesSequence.filter(
      (trade) => trade.value >= 0 && trade.direction === Direction.Long
    ).length;
    const totalLongs = tradeStats.tradesSequence.filter(
      (trade) => trade.value >= 0 && trade.direction === Direction.Long
    ).length;
    return totalLongs > 0
      ? `(${longWins}/${totalTrades}) ${(
          (longWins / totalTrades) *
          100
        ).toFixed(2)}%`
      : "N/A";
  }, [tradeStats]);

  const calculateShortsWonPercentage = useCallback(() => {
    const totalTrades = tradeStats.totalTrades;
    const shortWins = tradeStats.tradesSequence.filter(
      (trade) => trade.value >= 0 && trade.direction === Direction.Short
    ).length;
    const totalShorts = tradeStats.tradesSequence.filter(
      (trade) => trade.value >= 0 && trade.direction === Direction.Short
    ).length;
    return totalShorts > 0
      ? `(${shortWins}/${totalTrades}) ${(
          (shortWins / totalTrades) *
          100
        ).toFixed(2)}%`
      : "N/A";
  }, [tradeStats]);

  const calculateBestTradeDollars = useCallback(() => {
    const initialBalance = tradeStats.initialBalance;
    return Math.max(
      ...tradeStats.tradesSequence.map(
        (trade) => (trade.value / 100) * initialBalance
      ),
      0
    );
  }, [tradeStats]);

  const calculateWorstTradeDollars = useCallback(() => {
    const initialBalance = tradeStats.initialBalance;
    return Math.min(
      ...tradeStats.tradesSequence.map(
        (trade) => (trade.value / 100) * initialBalance
      ),
      0
    );
  }, [tradeStats]);

  const calculateWorstTradePips = useCallback(() => {
    return Math.min(
      ...tradeStats.tradesSequence.map((trade) => trade.value),
      0
    );
  }, [tradeStats]);

  const calculateAvgTradeLength = useCallback(() => {
    return "7h 31m";
  }, []);

  const calculateSimpleMovingAverage = useCallback(
    (period: number) => {
      if (period <= 0 || tradeStats.tradesSequence.length === 0) {
        return 0;
      }

      const sum = tradeStats.tradesSequence
        .slice(-period)
        .reduce((acc, trade) => acc + trade.value, 0);

      return sum / period;
    },
    [tradeStats]
  );

  const calculateStdDeviation = useCallback(() => {
    const tradeSequence = tradeStats.tradesSequence;
    const returns = tradeSequence.map((trade) => trade.value);
    const mean =
      returns.reduce((sum, value) => sum + value, 0) / returns.length;
    const variance =
      returns.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      returns.length;

    return Math.sqrt(variance);
  }, [tradeStats]);

  const calculateSharpeRatio = useCallback(() => {
    const portfolioReturn = tradeStats.balance;
    const stdDeviation = calculateStdDeviation();
    const riskFreeRate = 0.02;
    if (stdDeviation === 0) {
      return 0;
    }

    const sharpeRatio = (portfolioReturn - riskFreeRate) / stdDeviation;

    return sharpeRatio;
  }, [tradeStats, calculateStdDeviation]);

  const calculateZScorePercentage = useCallback(() => {
    const tradeSequence = tradeStats.tradesSequence ?? [];
    const returns = tradeSequence.map((trade) => trade.value);
    const mean =
      returns.reduce((sum, value) => sum + value, 0) / returns.length;
    const standardDeviation = Math.sqrt(
      returns.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
        returns.length
    );

    return (
      ((tradeSequence[tradeSequence.length - 1]?.value - mean) /
        standardDeviation) *
      100
    );
  }, [tradeStats]);

  const calculateZScoreProbability = useCallback(() => {
    const zScore = calculateZScorePercentage() / 100;

    // Use the standard normal distribution function (CDF) to calculate probability
    const probability = 0.5 * (1 + erf(zScore / Math.sqrt(2)));

    return probability;
  }, [calculateZScorePercentage]);

  const calculateExpectancyPips = useCallback(() => {
    return 2.5;
  }, []);

  const calculateExpectancyDollars = useCallback(() => {
    const tradeSequence = tradeStats.tradesSequence;
    const initialCapital = tradeStats.initialBalance;
    let totalProfit = 0;
    let totalLoss = 0;
    let numProfitableTrades = 0;
    let numLosingTrades = 0;

    for (const trade of tradeSequence) {
      if (trade.value > 0) {
        totalProfit += trade.value;
        numProfitableTrades++;
      } else if (trade.value < 0) {
        totalLoss += Math.abs(trade.value);
        numLosingTrades++;
      }
    }

    const averageProfit =
      numProfitableTrades > 0 ? totalProfit / numProfitableTrades : 0;
    const averageLoss = numLosingTrades > 0 ? totalLoss / numLosingTrades : 0;

    const winningTradeProbability = numProfitableTrades / tradeSequence.length;
    const losingTradeProbability = numLosingTrades / tradeSequence.length;

    const expectancyDollars =
      winningTradeProbability * averageProfit -
      losingTradeProbability * averageLoss;
    return (expectancyDollars / 100) * initialCapital;
  }, [tradeStats]);

  const calculateAhpr = useCallback(() => {
    const initialCapital = tradeStats.initialBalance;
    const tradeSequence = tradeStats.tradesSequence;
    const sumOfReturns = tradeSequence.reduce(
      (sum, trade) => sum + (trade.value / 100) * initialCapital,
      0
    );
    return sumOfReturns / tradeSequence.length; //* 100;
  }, [tradeStats]);

  const calculateGhpr = useCallback(() => {
    const initialCapital = tradeStats.initialBalance;

    const tradeSequence = tradeStats.tradesSequence;
    const productOfReturns = tradeSequence.reduce(
      (product, trade) => product * (1 + trade.value),
      1
    );
    return (productOfReturns - 1) * 100;
  }, [tradeStats]);

  const calculateRelativeDrawdown = useCallback(() => {
    const tradeSequence = tradeStats.growth;
    let peakValue = tradeSequence[0]?.value; // Assume the first trade as the initial peak
    let lowestValue = peakValue; // Assume the initial peak as the lowest value

    for (const trade of tradeSequence) {
      if (trade.value > peakValue) {
        peakValue = trade.value; // Update peak value if a new high is reached
      } else {
        lowestValue = Math.min(lowestValue, trade.value); // Update lowest value if a new low is reached
      }
    }

    const relativeDrawdown = (lowestValue - peakValue) / peakValue; // Calculate relative drawdown as a percentage
    return relativeDrawdown;
  }, [tradeStats]);

  const calculateAbsoluteDrawdown = useCallback(() => {
    const initialCapital = tradeStats.initialBalance;
    const tradeSequence = tradeStats.growth;
    let lowestValue = initialCapital; // Assume initial capital as the lowest value
    let drawdown = 0;

    for (const trade of tradeSequence) {
      lowestValue = Math.min(lowestValue, initialCapital - trade.value); // Update lowest value if a new low is reached
      drawdown = Math.min(drawdown, lowestValue - initialCapital); // Update drawdown if the current one is less
    }

    return drawdown;
  }, [tradeStats]);

  const calculateGrowth = useCallback(() => {
    const tradeSequence = tradeStats.tradesSequence;
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
  }, [tradeStats]);

  //MEMOS

  const averageWinDollars = useMemo(
    () => calculateAverageWinDollars(),
    [calculateAverageWinDollars]
  );
  const averageLossDollars = useMemo(
    () => calculateAverageLossDollars(),
    [calculateAverageLossDollars]
  );
  const winCount = useMemo(() => calculateWinCount(), [calculateWinCount]);
  const lossCount = useMemo(() => calculateLossCount(), [calculateLossCount]);
  const breakEvenCount = useMemo(
    () => calculateBreakEvenCount(),
    [calculateLossCount]
  );
  const totalTrades = useMemo(
    () => calculateTotalTrades(),
    [calculateTotalTrades]
  );
  const totalWinnings = useMemo(
    () => calculateTotalWinnings(),
    [calculateTotalWinnings]
  );
  const totalLosses = useMemo(
    () => calculateTotalLosses(),
    [calculateTotalLosses]
  );
  const profitGain = useMemo(
    () => calculateProfitGain(),
    [calculateProfitGain]
  );
  const balance = useMemo(() => calculateBalance(), [calculateBalance]);
  const profitFactor = useMemo(
    () => calculateProfitFactor(),
    [calculateProfitFactor]
  );
  const averageRiskToReward = useMemo(
    () => calculateAverageRiskToReward(),
    [calculateAverageRiskToReward]
  );
  const longsWonPercentage = useMemo(
    () => calculateLongsWonPercentage(),
    [calculateLongsWonPercentage]
  );
  const shortsWonPercentage = useMemo(
    () => calculateShortsWonPercentage(),
    [calculateShortsWonPercentage]
  );
  const winRate = useMemo(() => calculateWinRate(), [calculateWinRate]);
  const bestTradeDollars = useMemo(
    () => calculateBestTradeDollars(),
    [calculateBestTradeDollars]
  );
  const worstTradeDollars = useMemo(
    () => calculateWorstTradeDollars(),
    [calculateWorstTradeDollars]
  );
  const worstTradePips = useMemo(
    () => calculateWorstTradePips(),
    [calculateWorstTradePips]
  );
  const avgTradeLength = useMemo(
    () => calculateAvgTradeLength(),
    [calculateAvgTradeLength]
  );
  const simpleMovingAverage = useMemo(
    () => calculateSimpleMovingAverage(10),
    [calculateSimpleMovingAverage]
  );
  const stdDeviation = useMemo(
    () => calculateStdDeviation(),
    [calculateStdDeviation]
  );
  const sharpeRatio = useMemo(
    () => calculateSharpeRatio(),
    [calculateSharpeRatio]
  );
  const zScoreProbability = useMemo(
    () => calculateZScoreProbability(),
    [calculateZScoreProbability]
  );
  const zScorePercentage = useMemo(
    () => calculateZScorePercentage(),
    [calculateZScorePercentage]
  );
  const expectancyPips = useMemo(
    () => calculateExpectancyPips(),
    [calculateExpectancyPips]
  );
  const expectancyDollars = useMemo(
    () => calculateExpectancyDollars(),
    [calculateExpectancyDollars]
  );
  const ahpr = useMemo(() => calculateAhpr(), [calculateAhpr]);
  const ghpr = useMemo(() => calculateGhpr(), [calculateGhpr]);
  const absoluteDrawdown = useMemo(
    () => calculateAbsoluteDrawdown(),
    [tradeStats]
  );
  const relativeDrawdown = useMemo(
    () => calculateRelativeDrawdown(),
    [tradeStats]
  );
  const growth = useMemo(() => calculateGrowth(), [tradeStats]);

  return {
    averageWinDollars,
    averageLossDollars,
    winCount,
    lossCount,
    breakEvenCount,
    totalTrades,
    totalWinnings,
    totalLosses,
    winRate,
    profitGain,
    balance,
    profitFactor,
    averageRiskToReward,
    longsWonPercentage,
    shortsWonPercentage,
    bestTradeDollars,
    worstTradeDollars,
    worstTradePips,
    avgTradeLength,
    simpleMovingAverage,
    stdDeviation,
    sharpeRatio,
    zScoreProbability,
    zScorePercentage,
    expectancyPips,
    expectancyDollars,
    ahpr,
    ghpr,
    relativeDrawdown,
    absoluteDrawdown,
    growth,
  };
};

export default useStrategyMetrix;
