import React, { useState } from "react";
import {
  Container,
  Header,
  HeaderWrapper,
  StyledButton,
  StyledButtonWrapper,
} from "./elements";
import InputPromptModal from "@/components/modal/InputPrompt/InputPromptModal";
import { PromptInput, PromptTextArea } from "../common";

const LibraryNav = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <StyledButtonWrapper>
        <StyledButton onClick={() => setShowModal(true)}>
          Create Library
        </StyledButton>
      </StyledButtonWrapper>
      <HeaderWrapper>
        <Header>Your Libraries</Header>
      </HeaderWrapper>
      <InputPromptModal
        onSubmit={() => {}}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <>
          <PromptInput placeholder="Enter Library Name" />
          <PromptTextArea placeholder="Enter Library Description" />
        </>
      </InputPromptModal>
    </Container>
  );
};

export default LibraryNav;
