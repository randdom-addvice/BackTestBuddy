import React, { lazy, Suspense, useCallback, useEffect } from "react";
import { LayoutContainer } from "./elements";
import { useLazyGetUserQueryHook } from "@/graphql/queries/auth/auth.queries";

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

  useEffect(() => {
    lazyGetUser();
  }, []);

  return (
    <Suspense fallback={<div>Loading your dashboard ... Please wait</div>}>
      <LazySideBar />
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <LayoutContainer>{children}</LayoutContainer>
      </div>
    </Suspense>
  );
};

export default DashBoardLayout;
