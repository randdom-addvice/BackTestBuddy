import React, { useState } from "react";
import ModalRoot from "../ModalRoot";
import { NativeModalBackdrop } from "../elements";
import { MdOutlineCancel } from "react-icons/md";
import {
  StyledButton,
  StyledIconButton,
  StyledModal,
  StyledModalContainer,
  StyledModalContainerBody,
  StyledModalContainerFooter,
  StyledModalContainerHeader,
  StyledModalContainerTitle,
} from "./elements";
interface IProps {
  showModal: boolean;
  setShowModal: (
    state: boolean
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode | JSX.Element;
  onSubmit: () => void;
}

const InputPromptModal: React.FC<IProps> = ({
  showModal,
  setShowModal,
  children,
  onSubmit,
}) => {
  function closeModal() {
    setShowModal(false);
  }
  return (
    <ModalRoot
      showModal={showModal}
      setShowModal={setShowModal}
      closeModalOnBackdropClick={false}
      showBackDrop={false}
    >
      <StyledModal>
        <StyledModalContainer>
          <StyledModalContainer>
            <StyledModalContainerHeader>
              <StyledModalContainerTitle>
                Create new library
              </StyledModalContainerTitle>
              <StyledIconButton onClick={closeModal}>
                <MdOutlineCancel />
              </StyledIconButton>
            </StyledModalContainerHeader>
            <StyledModalContainerBody className="rtf">
              {children}
            </StyledModalContainerBody>
            <StyledModalContainerFooter>
              <StyledButton className="is-secondary" onClick={closeModal}>
                Cancel
              </StyledButton>
              <StyledButton className="is-primary" onClick={onSubmit}>
                Proceed
              </StyledButton>
            </StyledModalContainerFooter>
          </StyledModalContainer>
        </StyledModalContainer>
      </StyledModal>
    </ModalRoot>
  );
};

export default InputPromptModal;
