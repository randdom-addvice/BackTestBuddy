import React, { useState } from "react";
import {
  Container,
  Header,
  HeaderWrapper,
  StyledButton,
  StyledButtonWrapper,
} from "./elements";

const LibraryNav = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Container>
      <StyledButtonWrapper>
        <StyledButton>Create Library</StyledButton>
      </StyledButtonWrapper>
      <HeaderWrapper>
        <Header>Your Libraries</Header>
      </HeaderWrapper>
    </Container>
  );
};

export default LibraryNav;
