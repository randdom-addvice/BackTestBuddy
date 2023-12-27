import React, { lazy, Suspense, useCallback, useEffect } from "react";
import { LayoutContainer } from "./elements";
import { useLazyGetUserQueryHook } from "@/graphql/queries/auth/auth.queries";

const LazySideBar = lazy(
  () => import("@/components/dashboard/sidebar/SideBar")
);
const LazyBacktestBlock = lazy(
  () => import("@/components/dashboard/backtestBlock/BacktestBlock")
);
const LazyDetailsBlock = lazy(
  () => import("@/components/dashboard/detailsBlock/DetailsBlock")
);

const DashBoardLayout = () => {
  const { lazyGetUser } = useLazyGetUserQueryHook({
    fetchPolicy: "cache-first",
  });

  // const memoizedSetUser = useCallback(() => {
  //   if (data?.getUser) {
  //     console.log("run once");
  //     dispatch(authActions.setUserData(data?.getUser));
  //   }
  // }, []);

  useEffect(() => {
    lazyGetUser();
  }, []);

  return (
    <LayoutContainer>
      <Suspense fallback={<div>Loading your dashboard ... Please wait</div>}>
        <LazySideBar />
        <LazyBacktestBlock />
        <LazyDetailsBlock />
      </Suspense>
    </LayoutContainer>
  );
};

export default DashBoardLayout;
