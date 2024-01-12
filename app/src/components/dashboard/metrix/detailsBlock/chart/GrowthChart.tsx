import React, { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { Container, ContainerHeader, Tab, TabLabel, Wrapper } from "./elements";
import { useAppSelector } from "@/redux/hooks";
import { TradeStats } from "@/graphql/api";
import useStrategyMetrix from "@/hooks/strategy/useStrategyMetrix";
import { debounce } from "lodash";

interface IProps {
  tradeStats: TradeStats;
}

const GrowthChart: React.FC<IProps> = ({ tradeStats }) => {
  const metrix = useAppSelector(
    (state) => state.strategy.selectedStrategyMetrix
  );
  const { balance, growth } = useStrategyMetrix(tradeStats);
  const [activeTab, setActiveTab] = useState<number>(1);

  const [debouncedState, setDebouncedState] = useState({
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: [],
        labels: {
          hideOverlappingLabels: true,
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        name: "Growth (%)",
        data:
          activeTab === 0
            ? growth.map((i) =>
                parseInt(
                  ((i.value / 100) * tradeStats.initialBalance).toFixed(1)
                )
              ) ?? []
            : growth.map((i) => parseInt(i.value.toFixed(2))) ?? [], // [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
  });

  const updateDebouncedState = debounce(() => {
    if (activeTab === 0) {
      setDebouncedState((prev) => ({
        ...prev,
        series: [
          {
            ...prev.series[0],
            name: "Profit ($)",
            data:
              growth.map((i) =>
                parseInt(
                  ((i.value / 100) * tradeStats.initialBalance).toFixed(1)
                )
              ) ?? [],
          },
        ],
      }));
    } else {
      setDebouncedState((prev) => ({
        ...prev,
        series: [
          {
            ...prev.series[0],
            name: "Growth (%)",
            data: growth.map((i) => parseInt(i.value.toFixed(2))) ?? [],
          },
        ],
      }));
    }
  }, 2000);

  useEffect(() => {
    updateDebouncedState();
  }, [activeTab, tradeStats]);

  return (
    <Wrapper>
      <ContainerHeader>
        <h4>
          Balance <span>(${balance.toLocaleString()})</span>
        </h4>
        <Tab>
          <TabLabel onClick={() => setActiveTab(0)} isActive={0 === activeTab}>
            Profit
          </TabLabel>
          <TabLabel onClick={() => setActiveTab(1)} isActive={1 === activeTab}>
            Growth
          </TabLabel>
        </Tab>
      </ContainerHeader>
      <Container>
        <div style={{ width: "100%", height: "100" }}>
          <Chart
            options={debouncedState.options}
            series={debouncedState.series}
            type="area"
            // width={500}
            height={366}
          />
        </div>
      </Container>
    </Wrapper>
  );
};

export default GrowthChart;
