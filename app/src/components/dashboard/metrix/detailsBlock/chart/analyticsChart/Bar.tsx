import {
  Direction,
  TradeSequenceDetail,
  TradeSequenceDetailInput,
  TradeStats,
} from "@/graphql/api";
import { useAppSelector } from "@/redux/hooks";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { debounce } from "lodash";

type Props = {
  tradeStats: TradeStats;
};
interface AverageRiskToReward {
  asset: string;
  averageRatio: number;
}
const Bar = () => {
  const metrix = useAppSelector(
    (state) => state.strategy.selectedStrategyMetrix
  );

  const calculateAverageRiskToReward = useCallback(() => {
    // Group trades by asset
    const trades: TradeSequenceDetail[] =
      metrix?.tradeStats.tradesSequence ?? [];
    const groupedData: Record<string, number[]> = {};
    trades.forEach((trade) => {
      const asset = trade.asset;
      if (!groupedData[asset]) {
        groupedData[asset] = [];
      }
      if (trade.value !== 0) {
        groupedData[asset].push(trade.value);
      }
    });
    // Calculate average risk-to-reward ratio for each asset
    const averageRatios: AverageRiskToReward[] = Object.keys(groupedData).map(
      (asset) => {
        const values = groupedData[asset];
        const riskTrades = values.filter((trade) => trade < 0);
        const rewardTrades = values.filter((trade) => trade > 0);

        const totalRisk = riskTrades.reduce(
          (total, trade) => total + Math.abs(trade),
          0
        );
        const totalReward = rewardTrades.reduce(
          (total, trade) => total + Math.abs(trade),
          0
        );
        const averageProfit = totalReward / rewardTrades.length;
        const averageloss = totalRisk / riskTrades.length;
        return {
          asset,
          averageRatio:
            totalRisk > 0
              ? Number((averageProfit / averageloss).toFixed(2))
              : 0,
        };
      }
    );

    return averageRatios;
  }, [metrix]);

  const result = useMemo(() => calculateAverageRiskToReward(), [metrix]);

  const [debouncedState, setDebouncedState] = useState({
    series: [
      {
        name: "AVG. Risk-Reward-Ratio",
        data: result.map((i) => i.averageRatio),
      },
    ],
    options: {
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      labels: result.map((i) => i.asset),
      // xaxis: {
      //   categories: result.map((i) => i.asset),
      // },
    },
  });

  const updateDebouncedState = debounce(() => {
    setDebouncedState((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        labels: result.map((i) => i.asset),
      },
      series: [
        {
          name: "AVG. Risk-Reward-Ratio",
          data: result.map((i) => i.averageRatio),
        },
      ],
      // xaxis: {
      //   categories: result.map((i) => i.asset),
      // },
    }));
  }, 3000);

  useEffect(() => {
    updateDebouncedState();
  }, [result, metrix]);

  return (
    <div id="chart">
      <ReactApexChart
        options={debouncedState.options}
        series={debouncedState.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Bar;
