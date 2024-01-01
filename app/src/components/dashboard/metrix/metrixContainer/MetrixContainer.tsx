// src/containers/MetrixContainer.tsx
import React, { Suspense, useEffect, useState } from "react";
import { lazy } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useGetStrategyQueryHook } from "@/graphql/queries/strategy/strategy.queries";
import DashBoardLayout from "@/components/dashboard/layout/DashBoardLayout";
import ToastMessage from "@/components/common/ui/toastsMessages/ToastMessage";
import { AppRoutes } from "@/routes/routesDeclaration";

const LazyBacktestBlock = lazy(
  () => import("@/components/dashboard/metrix/backtestBlock/BacktestBlock")
);
const LazyDetailsBlock = lazy(
  () => import("@/components/dashboard/metrix/detailsBlock/DetailsBlock")
);

const MetrixContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error } = useGetStrategyQueryHook({ getStrategyId: id ?? "" });

  return (
    <DashBoardLayout>
      <Suspense
        fallback={<div>Loading your strategy metrix ... Please wait</div>}
      >
        <RenderMetrixContent error={error} />
      </Suspense>
    </DashBoardLayout>
  );
};
const RenderMetrixContent: React.FC<{ error?: Error }> = ({ error }) => {
  const [redirectToLibraries, setRedirectToLibraries] = useState(false);

  useEffect(() => {
    if (error) {
      const timerId = setTimeout(() => {
        // setRedirectToLibraries(true);
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

  return (
    <>
      <LazyBacktestBlock />
      <LazyDetailsBlock />
    </>
  );
};

export default MetrixContainer;
