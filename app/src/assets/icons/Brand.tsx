import React from "react";
import styled from "styled-components";
import BrandIcon from "./BrandIcon";
import BrandText from "./Brandtext";
import { StyledCenteredDiv } from "../../styles/globalElements";
const Wrapper = styled(StyledCenteredDiv)`
  margin-left: 18px;
`;

const StyledDiv = styled.div`
  margin-right: 18px;
`;

const Brand = () => {
  return (
    <Wrapper>
      <StyledDiv>
        <BrandIcon width="25px" />
      </StyledDiv>
      <BrandText width="145px" />
    </Wrapper>
  );
};

export default Brand;
