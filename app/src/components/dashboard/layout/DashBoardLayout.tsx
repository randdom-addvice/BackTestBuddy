import React from "react";
import { LayoutContainer } from "./elements";
import SideBar from "../sidebar/SideBar";
import BacktestBlock from "../backtestBlock/BacktestBlock";
import DetailsBlock from "../detailsBlock/DetailsBlock";

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
