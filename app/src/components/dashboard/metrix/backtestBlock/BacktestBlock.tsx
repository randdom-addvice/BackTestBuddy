import React from "react";
import { Container, BrandSectionContainer } from "./elements";
import Tab from "./Tab";
import Brand from "@/assets/icons/Brand";

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
