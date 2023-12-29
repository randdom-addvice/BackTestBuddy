import React, { lazy, Suspense } from "react";
import DashBoardLayout from "@/components/dashboard/layout/DashBoardLayout";
const LazyBacktestBlock = lazy(
  () => import("@/components/dashboard/metrix/backtestBlock/BacktestBlock")
);
const LazyDetailsBlock = lazy(
  () => import("@/components/dashboard/metrix/detailsBlock/DetailsBlock")
);

const MetrixPage = () => {
  return (
    <DashBoardLayout>
      <Suspense
        fallback={<div>Loading your strategy metrix ... Please wait</div>}
      >
        <LazyBacktestBlock />
        <LazyDetailsBlock />
      </Suspense>
    </DashBoardLayout>
  );
};

export default MetrixPage;
