import { Growth, TradeStats } from "@/graphql/api";

export class TradeMetricsCalculator {
  private readonly growth: Growth[];

  //   constructor(growth: Growth) {
  //     this.growth = growth;
  //   }
  private tradeStats: TradeStats;

  constructor(tradeStats: TradeStats) {
    this.tradeStats = tradeStats;
    this.growth = tradeStats.growth;
  }

  calculateAverageWinDollars(): number {
    const winValues = this.growth
      .filter((trade) => trade.value > 0)
      .map((trade) => trade.value);
    return winValues.length > 0
      ? winValues.reduce((sum, value) => sum + value, 0) / winValues.length
      : 0;
  }

  calculateAverageLossDollars(): number {
    const lossValues = this.growth
      .filter((trade) => trade.value < 0)
      .map((trade) => trade.value);
    return lossValues.length > 0
      ? lossValues.reduce((sum, value) => sum + value, 0) / lossValues.length
      : 0;
  }

  calculateLongsWonPercentage(): string {
    const longWins = this.growth.filter((trade) => trade.value > 0).length;
    const totalLongs = this.growth.filter((trade) => trade.value !== 0).length; // assuming 0 represents no change
    return totalLongs > 0 ? `${(longWins / totalLongs) * 100}%` : "N/A";
  }

  calculateShortsWonPercentage(): string {
    const shortWins = this.growth.filter((trade) => trade.value < 0).length;
    const totalShorts = this.growth.filter((trade) => trade.value !== 0).length; // assuming 0 represents no change
    return totalShorts > 0 ? `${(shortWins / totalShorts) * 100}%` : "N/A";
  }

  calculateBestTradeDollars(): number {
    const maxTradeValue = Math.max(...this.growth.map((trade) => trade.value));
    return !isNaN(maxTradeValue) ? maxTradeValue : 0;
  }

  calculateWorstTradeDollars(): number {
    const minTradeValue = Math.min(...this.growth.map((trade) => trade.value));
    return !isNaN(minTradeValue) ? minTradeValue : 0;
  }

  calculateWorstTradePips(): number {
    const minTradeValue = Math.min(...this.growth.map((trade) => trade.value));
    return !isNaN(minTradeValue) ? Math.abs(minTradeValue) : 0;
  }

  calculateAvgTradeLength(): string {
    // Assuming trade lengths are represented in minutes
    const avgTradeLength =
      this.growth.length > 0
        ? this.growth.reduce((sum, trade) => sum + trade.value, 0) /
          this.growth.length
        : 0;
    const hours = Math.floor(avgTradeLength / 60);
    const minutes = Math.floor(avgTradeLength % 60);
    return `${hours}h ${minutes}m`;
  }

  calculateProfitFactor(): number {
    const totalWinnings = this.growth
      .filter((trade) => trade.value > 0)
      .reduce((sum, trade) => sum + trade.value, 0);
    const totalLosses = this.growth
      .filter((trade) => trade.value < 0)
      .reduce((sum, trade) => sum + Math.abs(trade.value), 0);
    return totalLosses > 0 ? totalWinnings / totalLosses : 0;
  }

  calculateStdDeviation(): number {
    const mean =
      this.growth.length > 0
        ? this.growth.reduce((sum, trade) => sum + trade.value, 0) /
          this.growth.length
        : 0;
    const squaredDifferences = this.growth.map((trade) =>
      Math.pow(trade.value - mean, 2)
    );
    const variance =
      squaredDifferences.length > 0
        ? squaredDifferences.reduce((sum, value) => sum + value, 0) /
          squaredDifferences.length
        : 0;
    return Math.sqrt(variance);
  }

  calculateSharpeRatio(): number {
    return 0;
  }

  calculateZScoreProbability(): number {
    return -2.12;
  }

  calculateZScorePercentage(): string {
    return "99.99%";
  }

  calculateExpectancyPips(): number {
    const totalPips = this.growth.reduce(
      (sum, trade) => sum + Math.abs(trade.value),
      0
    );
    return this.growth.length > 0 ? totalPips / this.growth.length : 0;
  }

  calculateExpectancyDollars(): number {
    const totalDollars = this.growth.reduce(
      (sum, trade) => sum + trade.value,
      0
    );
    return this.growth.length > 0 ? totalDollars / this.growth.length : 0;
  }

  calculateAhpr(): string {
    return "0.00%";
  }

  calculateGhpr(): string {
    return "0.00%";
  }
}

// Example usage:
// const tradeMetricsCalculator = new TradeMetricsCalculator(growthData);
// const averageWinDollars = tradeMetricsCalculator.calculateAverageWinDollars();
// const averageLossDollars = tradeMetricsCalculator.calculateAverageLossDollars();
// const longsWonPercentage = tradeMetricsCalculator.calculateLongsWonPercentage();
// const shortsWonPercentage =
//   tradeMetricsCalculator.calculateShortsWonPercentage();
// const bestTradeDollars = tradeMetricsCalculator.calculateBestTradeDollars();
// const worstTradeDollars = tradeMetricsCalculator.calculateWorstTradeDollars();
// const worstTradePips = tradeMetricsCalculator.calculateWorstTradePips();
// const avgTradeLength = tradeMetricsCalculator.calculateAvgTradeLength();
// const profitFactor = tradeMetricsCalculator.calculateProfitFactor();
// const stdDeviation = tradeMetricsCalculator.calculateStdDeviation();
// const sharpeRatio = tradeMetricsCalculator.calculateSharpeRatio();
// const zScoreProbability = tradeMetricsCalculator.calculateZScoreProbability();
// const zScorePercentage = tradeMetricsCalculator.calculateZScorePercentage();
// const expectancyPips = tradeMetricsCalculator.calculateExpectancyPips();
// const expectancyDollars = tradeMetricsCalculator.calculateExpectancyDollars();
// const ahpr = tradeMetricsCalculator.calculateAhpr();
// const ghpr = tradeMetricsCalculator.calculateGhpr();
