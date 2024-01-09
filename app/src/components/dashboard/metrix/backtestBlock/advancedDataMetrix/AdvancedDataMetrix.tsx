import React, { useMemo } from "react";
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
  const tradeMetricsCalculator = useMemo(
    () => new TradeMetricsCalculator(tradeStats!),
    [tradeStats]
  );

  const relativeDrawdown = useMemo(
    () => tradeMetricsCalculator.calculateRelativeDrawdown(),
    [tradeMetricsCalculator]
  );
  const absoluteDrawdown = useMemo(
    () => tradeMetricsCalculator.calculateAbsoluteDrawdown(),
    [tradeMetricsCalculator]
  );
  const averageWinDollars = useMemo(
    () => tradeMetricsCalculator.calculateAverageWinDollars(),
    [tradeMetricsCalculator]
  );
  const averageLossDollars = useMemo(
    () => tradeMetricsCalculator.calculateAverageLossDollars(),
    [tradeMetricsCalculator]
  );
  const longsWonPercentage = useMemo(
    () => tradeMetricsCalculator.calculateLongsWonPercentage(),
    [tradeMetricsCalculator]
  );
  const shortsWonPercentage = useMemo(
    () => tradeMetricsCalculator.calculateShortsWonPercentage(),
    [tradeMetricsCalculator]
  );
  const bestTradeDollars = useMemo(
    () => tradeMetricsCalculator.calculateBestTradeDollars(),
    [tradeMetricsCalculator]
  );
  const worstTradeDollars = useMemo(
    () => tradeMetricsCalculator.calculateWorstTradeDollars(),
    [tradeMetricsCalculator]
  );
  const profitFactor = useMemo(
    () => tradeMetricsCalculator.calculateProfitFactor(),
    [tradeMetricsCalculator]
  );
  const averageRiskToreward = useMemo(
    () => tradeMetricsCalculator.calculateAverageRiskToReward(),
    [tradeMetricsCalculator]
  );
  const stdDeviation = useMemo(
    () => tradeMetricsCalculator.calculateStdDeviation(),
    [tradeMetricsCalculator]
  );
  const sharpeRatio = useMemo(
    () => tradeMetricsCalculator.calculateSharpeRatio(),
    [tradeMetricsCalculator]
  );
  const zScoreProbability = useMemo(
    () => tradeMetricsCalculator.calculateZScoreProbability(),
    [tradeMetricsCalculator]
  );
  const zScorePercentage = useMemo(
    () => tradeMetricsCalculator.calculateZScorePercentage(),
    [tradeMetricsCalculator]
  );
  const expectancyPips = useMemo(
    () => tradeMetricsCalculator.calculateExpectancyPips(),
    [tradeMetricsCalculator]
  );
  const expectancyDollars = useMemo(
    () => tradeMetricsCalculator.calculateExpectancyDollars(),
    [tradeMetricsCalculator]
  );
  const ahpr = useMemo(
    () => tradeMetricsCalculator.calculateAhpr(),
    [tradeMetricsCalculator]
  );
  const ghpr = useMemo(
    () => tradeMetricsCalculator.calculateGhpr(),
    [tradeMetricsCalculator]
  );

  const analysisData = [
    {
      name: "Gain",
      value: `%${tradeStats?.profitGain}`,
    },
    {
      name: "Balance",
      value: `$${tradeStats?.balance.toLocaleString()}`,
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
      value: 0,
    },
  ];
  const advancedAnalysisData = [
    {
      name: "Drawdown",
      value: `${absoluteDrawdown.toFixed(2)}%`,
    },
    {
      name: "Relative Drawdown (To be worked on)",
      value: `${relativeDrawdown.toFixed(2)}%`,
    },
    {
      name: "Average Win Dollars",
      value: `$${averageWinDollars.toFixed(2)}`,
    },
    {
      name: "Average Loss Dollars",
      value: `$${averageLossDollars.toFixed(2)}`,
    },
    {
      name: "Longs Won",
      value: `${longsWonPercentage}`,
    },
    {
      name: "Shorts Won",
      value: `${shortsWonPercentage}`,
    },
    {
      name: "Best Trade Dollars",
      value: `${bestTradeDollars}$`,
    },
    {
      name: "Worst Trade Dollars",
      value: `${worstTradeDollars}$`,
    },
    {
      name: "Avg. Risk-to-reward",
      value: averageRiskToreward.toFixed(2),
    },
    {
      name: "Profit Factor",
      value: profitFactor,
    },
    {
      name: "Std Deviation (To Be worked on)",
      value: `${stdDeviation.toFixed(3)}$`,
    },
    {
      name: "Sharpe Ratio (To Be worked on)",
      value: sharpeRatio.toFixed(2),
    },
    {
      name: "Z Score Probability",
      value: `${zScoreProbability.toFixed(2)}%`,
    },
    {
      name: "Z Score",
      value: zScorePercentage.toFixed(2),
    },
    {
      name: "Expectancy Dollars",
      value: `$${expectancyDollars.toFixed(2)}`,
    },
    {
      name: "Ahpr",
      value: `${ahpr.toFixed(2)}%`,
    },
    {
      name: "Ghpr",
      value: `${ghpr.toFixed(2)}%`,
    },
  ];
  //   console.log("xx averageLossDollars", averageLossDollars);
  return (
    <InfoModal
      headerTitle="Trade Analysis"
      onSubmit={() => {}}
      showModal={showModal}
      setShowModal={setShowModal}
      modalWidth="90%"
      showFooter={false}
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
     {
      name: "Worst Trade Pips",
      value: -80.3,
    },
*/
