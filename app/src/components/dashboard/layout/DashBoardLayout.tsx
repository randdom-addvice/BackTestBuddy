import React from "react";

import SideBar from "@/components/dashboard/sidebar/SideBar";
import BacktestBlock from "@/components/dashboard/backtestBlock/BacktestBlock";
import DetailsBlock from "@/components/dashboard/detailsBlock/DetailsBlock";
import { LayoutContainer } from "./elements";

const DashBoardLayout = () => {
  return (
    <LayoutContainer>
      <SideBar />
      <BacktestBlock />
      <DetailsBlock />
    </LayoutContainer>
  );
};

export default DashBoardLayout;
