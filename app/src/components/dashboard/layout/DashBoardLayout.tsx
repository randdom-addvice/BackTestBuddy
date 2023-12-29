import React, { lazy, Suspense, useCallback, useEffect } from "react";
import { LayoutContainer } from "./elements";
import { useLazyGetUserQueryHook } from "@/graphql/queries/auth/auth.queries";
import { useGetStrategyQueryHook } from "@/graphql/queries/strategy/strategy.queries";
import ErrorBoundary from "@/components/global/ErrorBoundary";

const LazySideBar = lazy(
  () => import("@/components/dashboard/sidebar/SideBar")
);
const LazyBacktestBlock = lazy(
  () => import("@/components/dashboard/metrix/backtestBlock/BacktestBlock")
);
const LazyDetailsBlock = lazy(
  () => import("@/components/dashboard/metrix/detailsBlock/DetailsBlock")
);
type Props = {
  children: React.ReactNode | JSX.Element;
};

const DashBoardLayout = ({ children }: Props) => {
  const { lazyGetUser } = useLazyGetUserQueryHook({
    fetchPolicy: "cache-first",
  });
  const { data, error } = useGetStrategyQueryHook({
    getStrategyId: "65644ebe62cef9f6092a15e4",
  });
  console.log(error, "rx");
  console.log(data);
  useEffect(() => {
    lazyGetUser();
  }, []);

  return (
    <Suspense fallback={<div>Loading your dashboard ... Please wait</div>}>
      <LayoutContainer>
        <LazySideBar />
        {children}
      </LayoutContainer>
    </Suspense>
  );
};

export default DashBoardLayout;
