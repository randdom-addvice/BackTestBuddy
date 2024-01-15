import React from "react";
import DashBoardLayout from "@/components/dashboard/layout/DashBoardLayout";
import { StyledContainer } from "@/styles/globalElements";
import PlansContainer from "@/components/plans/PlansContainer";
import styled from "styled-components";

const Container = styled.div`
  overflow-y: auto;
  width: 100%;
`;

const PlansPage = () => {
  return (
    <DashBoardLayout>
      <Container>
        <PlansContainer />
      </Container>
    </DashBoardLayout>
  );
};

export default PlansPage;
