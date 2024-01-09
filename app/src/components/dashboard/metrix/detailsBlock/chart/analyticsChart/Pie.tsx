import { Growth } from "@/graphql/api";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Pie = () => {
  const metrix = useAppSelector(
    (state) => state.strategy.selectedStrategyMetrix
  );
  const result = useMemo(() => {
    console.clear();
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
    console.log(trades);
    console.log(groupedData);
    console.log(Object.entries(groupedData).map((i) => i[1].length));
    console.log(Object.entries(groupedData).map((i) => i[0]));
    console.log({
      assets: Object.keys(groupedData),
      values: Object.values(groupedData).map((i) => i.length),
    });
    console.log([
      {
        assets: Object.keys(groupedData),
        values: Object.values(groupedData),
      },
    ]);
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
        <div id="chart">
          <ReactApexChart
            //@ts-ignore
            options={options}
            series={series}
            type="donut"
            width={380}
          />
        </div>
      </div>
    </div>
  );
};

export default Pie;
