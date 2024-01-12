import React from "react";
import { Container, ContainerHeader, Wrapper } from "../elements";
import Bar from "./Bar";
import { StyledFlex } from "@/styles/globalElements";
import Pie from "./Pie";
import { ChartContainer } from "./elements";

const AnalyticsCharts = () => {
  return (
    <Wrapper>
      <ContainerHeader>
        <h4>Risk Ratios & Trading popularity</h4>
      </ContainerHeader>
      <Container>
        <StyledFlex>
          <ChartContainer>
            <Bar />
          </ChartContainer>
          <ChartContainer>
            <Pie />
          </ChartContainer>
        </StyledFlex>
      </Container>
    </Wrapper>
  );
};

export default AnalyticsCharts;
