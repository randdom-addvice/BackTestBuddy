import React from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  CloseModalButton,
  Container,
  StatContainer,
  StatList,
  StatListHeader,
  StatListItem,
  StatListItemText,
  StatListItemTitle,
} from "./elements";
import { StyledFlex } from "@/styles/globalElements";
import InfoModal from "@/components/modal/InfoModal/InfoModal";
import { TradeMetricsCalculator } from "./utils";

interface IProps {
  showModal: boolean;
  setShowModal: (
    state: boolean
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
}

const AdvancedDataMetrix: React.FC<IProps> = ({ showModal, setShowModal }) => {
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
      name: "Average Win Dollars",
      value: 7.49,
    },
    {
      name: "Average Loss Dollars",
      value: -9.67,
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
      name: "Worst Trade Dollars",
      value: -82.22,
    },
    {
      name: "Worst Trade Pips",
      value: -80.3,
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
  const tradeMetricsCalculator = new TradeMetricsCalculator(tradeStats!);
  const averageWinDollars = tradeMetricsCalculator.calculateAverageWinDollars();
  const averageLossDollars =
    tradeMetricsCalculator.calculateAverageLossDollars();
  const longsWonPercentage =
    tradeMetricsCalculator.calculateLongsWonPercentage();
  const shortsWonPercentage =
    tradeMetricsCalculator.calculateShortsWonPercentage();
  const bestTradeDollars = tradeMetricsCalculator.calculateBestTradeDollars();
  const worstTradeDollars = tradeMetricsCalculator.calculateWorstTradeDollars();
  const worstTradePips = tradeMetricsCalculator.calculateWorstTradePips();
  const avgTradeLength = tradeMetricsCalculator.calculateAvgTradeLength();
  const profitFactor = tradeMetricsCalculator.calculateProfitFactor();
  const stdDeviation = tradeMetricsCalculator.calculateStdDeviation();
  const sharpeRatio = tradeMetricsCalculator.calculateSharpeRatio();
  const zScoreProbability = tradeMetricsCalculator.calculateZScoreProbability();
  const zScorePercentage = tradeMetricsCalculator.calculateZScorePercentage();
  const expectancyPips = tradeMetricsCalculator.calculateExpectancyPips();
  const expectancyDollars = tradeMetricsCalculator.calculateExpectancyDollars();
  const ahpr = tradeMetricsCalculator.calculateAhpr();
  const ghpr = tradeMetricsCalculator.calculateGhpr();
  console.log("xx averageWinDollars", averageWinDollars);
  return (
    <InfoModal
      headerTitle="Trade Analysis"
      onSubmit={() => {}}
      showModal={showModal}
      setShowModal={setShowModal}
      modalWidth="90%"
    >
      <StyledFlex gap="10px">
        <StatContainer>
          <StatListHeader>Trade Analysis</StatListHeader>
          <StatList>
            {analysisData.map((i, index) => (
              <StatListItem key={index}>
                <StatListItemTitle>{i.name}: </StatListItemTitle>
                <StatListItemText>{i.value}</StatListItemText>
              </StatListItem>
            ))}
          </StatList>
        </StatContainer>
        <StatContainer>
          <StatListHeader>Advanced Statistics</StatListHeader>
          <StatList>
            {advancedAnalysisData.map((i, index) => (
              <StatListItem key={index}>
                <StatListItemTitle>{i.name}: </StatListItemTitle>
                <StatListItemText>{i.value}</StatListItemText>
              </StatListItem>
            ))}
          </StatList>
        </StatContainer>
      </StyledFlex>
    </InfoModal>
  );
};

export default AdvancedDataMetrix;

//TBD: Integrate this into metric for later
/*
  {
      name: "Profitability Pips",
      value: 1804.3,
    },
    {
      name: "Average Win Pips",
      value: 7.48,
    },
    {
      name: "Average Loss Pips",
      value: -9.47,
    },
    {
      name: "Commissions",
      value: "$0.00",
    },
    {
      name: "Lots",
      value: 73.48,
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
      name: "Worst Trade Date",
      value: "Mar 28",
    },
*/
