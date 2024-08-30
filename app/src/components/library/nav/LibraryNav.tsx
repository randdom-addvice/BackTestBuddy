import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  HeaderWrapper,
  StyledButton,
  StyledButtonWrapper,
} from "./elements";

import { useForm } from "@/hooks/useForm";
import LibraryForm from "../LibraryForm";

const LibraryNav = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalButtonLoadingState, setModalButtonLoadingState] = useState(false);

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
      <LibraryForm
        showModal={showModal}
        setShowModal={setShowModal}
        isUpdateForm={false}
      />
    </Container>
  );
};

export default LibraryNav;
