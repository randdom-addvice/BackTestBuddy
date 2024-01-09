import { Direction, TradeStats } from "@/graphql/api";

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

export class TradeMetricsCalculator {
  private tradeStats: TradeStats;

  constructor(tradeStats: TradeStats) {
    this.tradeStats = tradeStats;
  }

  calculateAverageWinDollars(): number {
    const initialBalance = this.tradeStats.initialBalance;
    const winTrades = this.tradeStats.tradesSequence
      .filter((trade) => trade.value > 0)
      .map((i) => ({ ...i, value: (i.value / 100) * initialBalance }));
    const totalWinDollars = winTrades.reduce(
      (total, trade) => total + trade.value,
      0
    );

    return winTrades.length > 0 ? totalWinDollars / winTrades.length : 0;
  }

  calculateAverageLossDollars(): number {
    const initialBalance = this.tradeStats.initialBalance;
    const lossTrades = this.tradeStats.tradesSequence
      .filter((trade) => trade.value < 0)
      .map((i) => ({ ...i, value: (i.value / 100) * initialBalance }));
    const totalLossDollars = lossTrades.reduce(
      (total, trade) => total + trade.value,
      0
    );

    return lossTrades.length > 0 ? totalLossDollars / lossTrades.length : 0;
  }

  calculateWinCount(): number {
    return this.tradeStats.tradesSequence.filter((trade) => trade.value > 0)
      .length;
  }

  calculateLossCount(): number {
    return this.tradeStats.tradesSequence.filter((trade) => trade.value < 0)
      .length;
  }

  calculateTotalTrades(): number {
    return this.tradeStats.tradesSequence.length;
  }

  calculateTotalWinnings(): number {
    return this.tradeStats.tradesSequence.reduce(
      (total, trade) => (trade.value > 0 ? total + trade.value : total),
      0
    );
  }

  calculateTotalLosses(): number {
    return this.tradeStats.tradesSequence.reduce(
      (total, trade) =>
        trade.value < 0 ? total + Math.abs(trade.value) : total,
      0
    );
  }

  calculateProfitGain(): number {
    return this.calculateTotalWinnings() - this.calculateTotalLosses();
  }

  calculateProfitFactor(): number {
    const totalLosses = this.calculateTotalLosses();
    return totalLosses !== 0 ? this.calculateTotalWinnings() / totalLosses : 0;
  }

  calculateAverageRiskToReward(): number {
    const riskTrades = this.tradeStats.tradesSequence.filter(
      (trade) => trade.value < 0
    );
    const rewardTrades = this.tradeStats.tradesSequence.filter(
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
  }

  calculateLongsWonPercentage(): string {
    const totalTrades = this.tradeStats.totalTrades;
    const longWins = this.tradeStats.tradesSequence.filter(
      (trade) => trade.value >= 0 && trade.direction === Direction.Long
    ).length;
    const totalLongs = this.tradeStats.tradesSequence.filter(
      (trade) => trade.value >= 0 && trade.direction === Direction.Long
    ).length;
    return totalLongs > 0
      ? `(${longWins}/${totalTrades}) ${(
          (longWins / totalTrades) *
          100
        ).toFixed(2)}%`
      : "N/A";
  }

  calculateShortsWonPercentage(): string {
    const totalTrades = this.tradeStats.totalTrades;
    const shortWins = this.tradeStats.tradesSequence.filter(
      (trade) => trade.value >= 0 && trade.direction === Direction.Short
    ).length;
    const totalShorts = this.tradeStats.tradesSequence.filter(
      (trade) => trade.value >= 0 && trade.direction === Direction.Short
    ).length;
    return totalShorts > 0
      ? `(${shortWins}/${totalTrades}) ${(
          (shortWins / totalTrades) *
          100
        ).toFixed(2)}%`
      : "N/A";
  }

  calculateBestTradeDollars(): number {
    const initialBalance = this.tradeStats.initialBalance;
    return Math.max(
      ...this.tradeStats.tradesSequence.map(
        (trade) => (trade.value / 100) * initialBalance
      ),
      0
    );
  }

  calculateWorstTradeDollars(): number {
    const initialBalance = this.tradeStats.initialBalance;
    return Math.min(
      ...this.tradeStats.tradesSequence.map(
        (trade) => (trade.value / 100) * initialBalance
      ),
      0
    );
  }

  calculateWorstTradePips(): number {
    return Math.min(
      ...this.tradeStats.tradesSequence.map((trade) => trade.value),
      0
    );
  }

  calculateAvgTradeLength(): string {
    return "7h 31m";
  }

  calculateSimpleMovingAverage(period: number): number {
    if (period <= 0 || this.tradeStats.tradesSequence.length === 0) {
      return 0;
    }

    const sum = this.tradeStats.tradesSequence
      .slice(-period)
      .reduce((acc, trade) => acc + trade.value, 0);

    return sum / period;
  }

  calculateStdDeviation(): number {
    // const period = this.tradeStats.tradesSequence.length;
    // const sma = this.calculateSimpleMovingAverage(period);

    // const squaredDifferencesSum = this.tradeStats.tradesSequence.reduce(
    //   (sum, trade) => sum + Math.pow(trade.value - sma, 2),
    //   0
    // );

    // const stdDeviation =
    //   period > 0 ? Math.sqrt(squaredDifferencesSum / period) : 0;

    // return stdDeviation;
    const tradeSequence = this.tradeStats.tradesSequence;
    const returns = tradeSequence.map((trade) => trade.value);
    const mean =
      returns.reduce((sum, value) => sum + value, 0) / returns.length;
    const variance =
      returns.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      returns.length;

    return Math.sqrt(variance);
  }

  calculateSharpeRatio(): number {
    const portfolioReturn = this.tradeStats.balance;
    const stdDeviation = this.calculateStdDeviation();
    const riskFreeRate = 0.02;
    if (stdDeviation === 0) {
      return 0;
    }

    const sharpeRatio = (portfolioReturn - riskFreeRate) / stdDeviation;

    return sharpeRatio;
  }
  calculateZScoreProbability(): number {
    const zScore = this.calculateZScorePercentage() / 100;

    // Use the standard normal distribution function (CDF) to calculate probability
    const probability = 0.5 * (1 + erf(zScore / Math.sqrt(2)));

    return probability;
  }

  calculateZScorePercentage(): number {
    const tradeSequence = this.tradeStats.tradesSequence ?? [];
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
  }

  calculateExpectancyPips(): number {
    return 2.5;
  }

  calculateExpectancyDollars(): number {
    const tradeSequence = this.tradeStats.tradesSequence;
    const initialCapital = this.tradeStats.initialBalance;
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
  }

  calculateAhpr(): number {
    const initialCapital = this.tradeStats.initialBalance;
    const tradeSequence = this.tradeStats.tradesSequence;
    const sumOfReturns = tradeSequence.reduce(
      (sum, trade) => sum + (trade.value / 100) * initialCapital,
      0
    );
    return sumOfReturns / tradeSequence.length; //* 100;
  }

  calculateGhpr(): number {
    const initialCapital = this.tradeStats.initialBalance;

    const tradeSequence = this.tradeStats.tradesSequence;
    const productOfReturns = tradeSequence.reduce(
      (product, trade) => product * (1 + trade.value),
      1
    );
    return (productOfReturns - 1) * 100;
  }

  calculateRelativeDrawdown(): number {
    const tradeSequence = this.tradeStats.growth;
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
  }

  calculateAbsoluteDrawdown(): number {
    const initialCapital = this.tradeStats.initialBalance;
    const tradeSequence = this.tradeStats.growth;
    let lowestValue = initialCapital; // Assume initial capital as the lowest value
    let drawdown = 0;

    for (const trade of tradeSequence) {
      lowestValue = Math.min(lowestValue, initialCapital - trade.value); // Update lowest value if a new low is reached
      drawdown = Math.min(drawdown, lowestValue - initialCapital); // Update drawdown if the current one is less
    }

    return drawdown;
  }
}

// Example usage
// const tradeStats: TradeStats = {
//   tradesSequence: [
//     { asset: "EURUSDd", value: 1.5, direction: Direction.Long },
//     { asset: "EURUSDd", value: -1, direction: Direction.Short },
//     // Add other trades
//   ],
// };

// const tradeMetricsCalculator = new TradeMetricsCalculator(tradeStats);
// const winCount = tradeMetricsCalculator.calculateWinCount();
// const lossCount = tradeMetricsCalculator.calculateLossCount();
// const totalTrades = tradeMetricsCalculator.calculateTotalTrades();
// const totalWinnings = tradeMetricsCalculator.calculateTotalWinnings();
// const totalLosses = tradeMetricsCalculator.calculateTotalLosses();
// const profitGain = tradeMetricsCalculator.calculateProfitGain();
// const profitFactor = tradeMetricsCalculator.calculateProfitFactor();
// const longsWonPercentage = tradeMetricsCalculator.calculateLongsWonPercentage();
// const shortsWonPercentage =
//   tradeMetricsCalculator.calculateShortsWonPercentage();
// const bestTradeDollars = tradeMetricsCalculator.calculateBestTradeDollars();
// const worstTradeDollars = tradeMetricsCalculator.calculateWorstTradeDollars();
// const worstTradePips = tradeMetricsCalculator.calculateWorstTradePips();
// const avgTradeLength = tradeMetricsCalculator.calculateAvgTradeLength();
// const stdDeviation = tradeMetricsCalculator.calculateStdDeviation();
// const sharpeRatio = tradeMetricsCalculator.calculateSharpeRatio();
// const zScoreProbability = tradeMetricsCalculator.calculateZScoreProbability();
// const zScorePercentage = tradeMetricsCalculator.calculateZScorePercentage();
// const expectancyPips = tradeMetricsCalculator.calculateExpectancyPips();
// const expectancyDollars = tradeMetricsCalculator.calculateExpectancyDollars();
// const ahpr = tradeMetricsCalculator.calculateAhpr();
// const ghpr = tradeMetricsCalculator.calculateGhpr();
