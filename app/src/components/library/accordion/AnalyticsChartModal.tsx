import InfoModal from "@/components/modal/InfoModal/InfoModal";
import { Library, TradeStats } from "@/graphql/api";
import React, { useMemo } from "react";
import { StrategyCardType } from "../common";
import GrowthChart from "@/components/dashboard/metrix/detailsBlock/chart/GrowthChart";

interface IProps {
  showAnalyticsChartModal: boolean;
  setShowAnalyticsChartModal: (
    state: boolean
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
  strategies: StrategyCardType[];
}

const AnalyticsChartModal: React.FC<IProps> = ({
  showAnalyticsChartModal,
  setShowAnalyticsChartModal,
  strategies,
}) => {
  // console.log(strategies);
  const tradeStats = useMemo(() => {
    let tempTradeStats = {} as TradeStats;
    let tempTradeStats2: {
      growth: TradeStats["growth"];
      tradesSequence: TradeStats["tradesSequence"];
      balance: number;
    } = { growth: [], tradesSequence: [], balance: 0 };
    strategies.forEach((i) => {
      tempTradeStats = {
        ...tempTradeStats,
        ...i.tradeStats,
        ...(!tempTradeStats.growth ? { growth: [] } : null),
        // growth: [],
      };
      // i.tradeStats.growth.forEach((x) => tempTradeStats.growth.push(x));
      i.tradeStats.growth.forEach((x) => tempTradeStats2.growth.push(x));
      i.tradeStats.tradesSequence.forEach((x) =>
        tempTradeStats2.tradesSequence.push(x)
      );
      tempTradeStats2.balance = tempTradeStats2.balance + i.tradeStats.balance;
    });
    return tempTradeStats2;
  }, [strategies]);
  // console.log(tradeStats, "tradeStats");
  return (
    <InfoModal
      headerTitle={`Library Analytics Chart for `}
      onSubmit={() => {}}
      showModal={showAnalyticsChartModal}
      setShowModal={setShowAnalyticsChartModal}
      modalWidth="90%"
      showFooter={false}
    >
      <section>
        {strategies[0].tradeStats.growth ? (
          <GrowthChart
            tradeStats={{
              ...strategies[0].tradeStats,
              growth: tradeStats.growth,
              tradesSequence: tradeStats.tradesSequence,
              balance: tradeStats.balance,
            }}
          />
        ) : (
          <p>No data</p>
        )}
      </section>
    </InfoModal>
  );
};

export default AnalyticsChartModal;
