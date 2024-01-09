import React, { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { Container, ContainerHeader, Tab, TabLabel, Wrapper } from "./elements";
import { useAppSelector } from "@/redux/hooks";

const App: React.FC = () => {
  const metrix = useAppSelector(
    (state) => state.strategy.selectedStrategyMetrix
  );
  const [activeTab, setActiveTab] = useState<number>(1);

  const [state, setState] = useState({
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: null, //[1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
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
            ? metrix?.tradeStats.growth.map((i) =>
                parseInt(
                  ((i.value / 100) * metrix.tradeStats.initialBalance).toFixed(
                    1
                  )
                )
              ) ?? []
            : metrix?.tradeStats.growth.map((i) =>
                parseInt(i.value.toFixed(2))
              ) ?? [], // [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
  });

  useEffect(() => {
    if (activeTab === 0) {
      setState((prev) => ({
        ...prev,
        series: [
          {
            ...prev.series[0],
            name: "Profit ($)",
            data:
              metrix?.tradeStats.growth.map((i) =>
                parseInt(
                  ((i.value / 100) * metrix.tradeStats.initialBalance).toFixed(
                    1
                  )
                )
              ) ?? [],
          },
        ],
      }));
    } else {
      setState((prev) => ({
        ...prev,
        series: [
          {
            ...prev.series[0],
            name: "Growth (%)",
            data:
              metrix?.tradeStats.growth.map((i) =>
                parseInt(i.value.toFixed(2))
              ) ?? [],
          },
        ],
      }));
    }
  }, [activeTab, metrix]);

  return (
    <Wrapper>
      <ContainerHeader>
        <h4>
          Balance <span>(${metrix?.tradeStats.balance.toLocaleString()})</span>
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
            options={state.options}
            series={state.series}
            type="area"
            // width={500}
            height={366}
          />
        </div>
      </Container>
    </Wrapper>
  );
};

export default App;
