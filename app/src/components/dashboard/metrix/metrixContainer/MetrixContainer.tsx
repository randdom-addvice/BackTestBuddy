// src/containers/MetrixContainer.tsx
import React, { Suspense, useEffect, useState } from "react";
import { lazy } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useGetStrategyQueryHook } from "@/graphql/queries/strategy/strategy.queries";
import DashBoardLayout from "@/components/dashboard/layout/DashBoardLayout";
import ToastMessage from "@/components/common/ui/toastsMessages/ToastMessage";
import { AppRoutes } from "@/routes/routesDeclaration";
import { TradeStats } from "@/graphql/api";
import useStrategyMetrix from "@/hooks/strategy/useStrategyMetrix";
import { useAppSelector } from "@/redux/hooks";

const LazyBacktestBlock = lazy(
  () => import("@/components/dashboard/metrix/backtestBlock/BacktestBlock")
);
const LazyDetailsBlock = lazy(
  () => import("@/components/dashboard/metrix/detailsBlock/DetailsBlock")
);

const MetrixContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, loading } = useGetStrategyQueryHook({ getStrategyId: id ?? "" });

  return (
    <DashBoardLayout>
      <Suspense
        fallback={<div>Loading your strategy metrix ... Please wait</div>}
      >
        <RenderMetrixContent error={error} loading={loading} paramId={id ?? ""} />
      </Suspense>
    </DashBoardLayout>
  );
};
const RenderMetrixContent: React.FC<{
  error?: Error;
  loading: boolean;
  paramId: string
}> = ({ error, loading, paramId }) => {
  const [redirectToLibraries, setRedirectToLibraries] = useState(false);
  const selectedMetrix = useAppSelector(
    (state) => state.strategy.selectedStrategyMetrix
  );
  const tradeStats = selectedMetrix?.tradeStats
  const metricsId = selectedMetrix?._id

  useEffect(() => {
    if (error) {
      const timerId = setTimeout(() => {
        setRedirectToLibraries(true);
      }, 2000);
      return () => clearTimeout(timerId);
    }
  }, [error]);

  if (error) {
    return (
      <>
        <ToastMessage
          show={true}
          type="error"
          title="Error"
          message="Strategy metrix doesn't exist"
        />
        {redirectToLibraries && <Navigate to={AppRoutes.LIBRARIES} />}
      </>
    );
  }

  if(metricsId !== paramId && loading ) return <div>Loading your strategy metrics ... Please wait</div>

  return (
    <>
      <LazyBacktestBlock />
      {tradeStats && <LazyDetailsBlock tradeStats={tradeStats} />}
    </>
  );
};

export default MetrixContainer;
