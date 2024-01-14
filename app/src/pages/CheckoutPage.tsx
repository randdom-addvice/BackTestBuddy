import React from "react";

import DashBoardLayout from "@/components/dashboard/layout/DashBoardLayout";
import styled from "styled-components";

const Container = styled.div`
  overflow-y: auto;
  width: 100%;
`;

const CheckoutPage = () => {
  return (
    <DashBoardLayout>
      <Container>Checkout page</Container>
    </DashBoardLayout>
  );
};

export default CheckoutPage;
