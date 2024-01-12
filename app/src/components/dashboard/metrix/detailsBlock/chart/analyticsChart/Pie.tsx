import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { debounce } from "lodash";

// ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChartJS() {
  const metrix = useAppSelector(
    (state) => state.strategy.selectedStrategyMetrix
  );

  const calculateChartData = () => {
    const groupedData: Record<string, number[]> = {};
    const trades = metrix?.tradeStats.tradesSequence ?? [];

    trades.forEach((trade) => {
      const asset = trade.asset;
      if (!groupedData[asset]) groupedData[asset] = [];
      groupedData[asset].push(trade.value);
    });

    return {
      assets: Object.keys(groupedData),
      values: Object.values(groupedData).map((i) => i.length),
    };
  };

  const [result, setResult] = useState(calculateChartData);

  const debouncedCalculateChartData = useMemo(
    () => debounce(() => setResult(calculateChartData()), 5000),
    [result]
  );

  useEffect(() => {
    debouncedCalculateChartData();
  }, [metrix]);

  const backgroundColorCodes = useMemo(
    () =>
      result.values.map(() => [
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
      ]),
    [result.values]
  );

  console.log("roll");

  const generateBackgroundColor = useMemo(
    () =>
      backgroundColorCodes.map((i) => `rgba(${i[0]}, ${i[1]}, ${i[2]}, 0.2)`),
    [backgroundColorCodes]
  );

  const generateBorderColor = useMemo(
    () => backgroundColorCodes.map((i) => `rgba(${i[0]}, ${i[1]}, ${i[2]}, 1)`),
    [backgroundColorCodes]
  );

  const data = {
    labels: result.assets,
    datasets: [
      {
        label: "# of trades",
        data: result.values,
        backgroundColor: generateBackgroundColor,
        borderColor: generateBorderColor,
        borderWidth: 1,
        options: {
          plugins: {
            colorschemes: {
              scheme: "brewer.Paired12",
            },
          },
        },
      },
    ],
  };

  return <Doughnut data={data} width={300} />;
}

const Pie = () => {
  const metrix = useAppSelector(
    (state) => state.strategy.selectedStrategyMetrix
  );
  const result = useMemo(() => {
    // console.clear();
    const groupedData: Record<string, number[]> = {};
    const trades = metrix?.tradeStats.tradesSequence ?? [];
    trades.forEach((trade) => {
      const asset = trade.asset;
      //   console.log(trade.value);
      if (!groupedData[asset]) groupedData[asset] = [];
      groupedData[asset].push(trade.value);
      if (trade.value !== 0) {
      }
    });
    return {
      assets: Object.keys(groupedData),
      values: Object.values(groupedData).map((i) => i.length),
    };
  }, [metrix]);
  const [series, setSeries] = useState<number[]>(result.values);

  const options = {
    labels: result.assets,
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
            total: {
              show: true,
              label: "Total",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            show: false,
          },
        },
      },
      {
        breakpoint: 800,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      show: false,
      position: "right",
      //   offsetY: 0,
      //   height: 230,
    },
  };

  useEffect(() => {
    console.log(result);
    setSeries((prev) => ({
      ...prev,
      series: [
        {
          name: "AVG. Risk-Reward-Ratio",
          data: result.values,
        },
      ],
    }));
  }, [metrix]);

  return (
    <div>
      <div className="chart-wrap">
        <div id="chart" style={{ width: "300px" }}>
          <ReactApexChart
            //@ts-ignore
            options={options}
            series={series}
            type="donut"
            width={380}
          />
          {/* <PieChartJS /> */}
        </div>
      </div>
    </div>
  );
};

export default Pie;
