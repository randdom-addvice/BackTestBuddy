import React from "react";
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
  headerTitle: string;
  modalWidth?: string;
  showModal: boolean;
  setShowModal: (
    state: boolean
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode | JSX.Element;
  onSubmit: () => void;
  showFooter?: boolean;
}

const InfoModal: React.FC<IProps> = ({
  showModal,
  setShowModal,
  children,
  onSubmit,
  headerTitle,
  modalWidth,
  showFooter = true,
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
        <StyledModalContainer width={modalWidth ? modalWidth : "550px"}>
          <StyledModalContainerHeader>
            <StyledModalContainerTitle>{headerTitle}</StyledModalContainerTitle>
            <StyledIconButton onClick={closeModal}>
              <MdOutlineCancel />
            </StyledIconButton>
          </StyledModalContainerHeader>
          <StyledModalContainerBody className="rtf">
            {children}
          </StyledModalContainerBody>
          {showFooter && (
            <StyledModalContainerFooter>
              <StyledButton className="is-secondary" onClick={closeModal}>
                Cancel
              </StyledButton>
              <StyledButton className="is-primary" onClick={onSubmit}>
                Proceed
              </StyledButton>
            </StyledModalContainerFooter>
          )}
        </StyledModalContainer>
      </StyledModal>
    </ModalRoot>
  );
};

export default InfoModal;
