import React, { useMemo } from "react";
import { StyledFlex } from "@/styles/globalElements";
import InfoModal from "@/components/modal/InfoModal/InfoModal";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { StrategyCardType } from "../common";
import { AnalyticsList, QuarterAnalyticsList } from "./elements";

interface IProps {
  showMetricsModal: boolean;
  setShowMetricsModal: (
    state: boolean
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
  library: {
    name: string;
    description: string;
    id: string;
  };
  strategies: StrategyCardType[];
}

const MetricsModal: React.FC<IProps> = ({
  showMetricsModal,
  setShowMetricsModal,
  library,
  strategies,
}) => {
  function calculateLibraryAnalytics(data: StrategyCardType[]): {
    totalTrades: number;
    averageTrades: number;
    totalWinning: number;
    averageWin: number;
    totalReturn: number;
    averageReturn: number;
  } {
    let totalTrades = 0;
    let totalWinning = 0;
    let totalReturn = 0;
    const numberOfObjects = data.length;
    // Calculate total trades, total winnings, and total returns
    data.forEach((item) => {
      totalTrades += item.totalTrades;
      totalWinning += item.percentageWin; // Assuming percentageWin is the winning amount, adjust if needed
      totalReturn += item.profitGain;
    });

    // Calculate averages
    const averageTrades =
      numberOfObjects > 0 ? totalTrades / numberOfObjects : 0;
    const averageWin = numberOfObjects > 0 ? totalWinning / numberOfObjects : 0;
    const averageReturn =
      numberOfObjects > 0 ? totalReturn / numberOfObjects : 0;

    return {
      totalTrades,
      averageTrades,
      totalWinning,
      averageWin,
      totalReturn,
      averageReturn,
    };
  }

  function calculateQuarterlyLibraryAnalytics(
    data: StrategyCardType[],
    numQuarters: number
  ) {
    const totalItems = data.length;
    const quarterSize = Math.ceil(totalItems / numQuarters);
    const metricsList = [];
    // console.clear();
    // console.log("quarterSize: ", quarterSize);
    // console.log("numQuarters: ", numQuarters);
    // console.log("data: ", data);
    for (let i = 0; i < quarterSize; i++) {
      const start = i * numQuarters; //i * quarterSize;
      const end = start + numQuarters; //Math.min(start, totalItems);
      // console.log("start: ", start);
      // console.log("end: ", end);
      const segment = data.slice(start, end);
      // console.log(segment);
      const metrics = calculateLibraryAnalytics(segment);
      metricsList.push(
        <div key={i}>
          <h3>Quarter {i + 1}</h3>
          <AnalyticsList>
            <li>
              <strong>Total Trades:</strong> <span>{metrics.totalTrades}</span>
            </li>
            <li>
              <strong>Average Trades:</strong>{" "}
              <span>{metrics.averageTrades.toFixed(2)}</span>
            </li>
            <li>
              <strong>Total Winning:</strong>{" "}
              <span>{metrics.totalWinning}</span>
            </li>
            <li>
              <strong>Average Win:</strong>{" "}
              <span>{metrics.averageWin.toFixed(2)}</span>
            </li>
            <li>
              <strong>Total Return:</strong> <span>{metrics.totalReturn}</span>
            </li>
            <li>
              <strong>Average Return:</strong>{" "}
              <span>{metrics.averageReturn.toFixed(2)}</span>
            </li>
          </AnalyticsList>
        </div>
      );
    }
    return metricsList;
  }

  const libraryAnalytics = useMemo(
    () => calculateLibraryAnalytics(strategies),
    [strategies, library]
  );
  return (
    <InfoModal
      headerTitle={`Library Analytics for ${library.name}`}
      onSubmit={() => {}}
      showModal={showMetricsModal}
      setShowModal={setShowMetricsModal}
      modalWidth="90%"
      showFooter={false}
    >
      <section>
        <AnalyticsList>
          <li>
            <strong>Total Trades: </strong>
            <span>{libraryAnalytics.totalTrades}</span>
          </li>
          <li>
            <strong>Average Trades: </strong>
            <span>{libraryAnalytics.averageTrades.toFixed(2)}</span>
          </li>
          <li>
            <strong>Average Winning Percentage:</strong>
            <span>{libraryAnalytics.averageWin.toFixed(2)}</span>
          </li>
          <li>
            <strong>Total Return:</strong>
            <span>{libraryAnalytics.totalReturn.toFixed(2)}</span>
          </li>
          <li>
            <strong>Average Return:</strong>
            <span>{libraryAnalytics.averageReturn.toFixed(2)}</span>
          </li>
        </AnalyticsList>
        <QuarterAnalyticsList>
          {calculateQuarterlyLibraryAnalytics(strategies, 3)}
        </QuarterAnalyticsList>
      </section>
    </InfoModal>
  );
};

export default MetricsModal;
