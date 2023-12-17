import React from "react";
import { Container, BrandSectionContainer } from "./elements";
import Brand from "../../../assets/icons/Brand";
import Tab from "./Tab";

const BacktestBlock = () => {
  return (
    <Container>
      <BrandSectionContainer>
        <Brand />
      </BrandSectionContainer>
      <Tab tabs={["Backtest", "Data"]} />
    </Container>
  );
};

export default BacktestBlock;
