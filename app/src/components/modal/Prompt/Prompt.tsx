import React from "react";
import {
  DirectoryList,
  DirectoryListItem,
  DirectoryName,
  Error,
  Input,
  ModalContentContainer,
  ModalContentMessage,
  ModalContentSubMessage,
  ModalContentWrapper,
  ModalHeaderButton,
  ModalHeaderContainer,
  ModalHeaderTitle,
  RadioSelect,
} from "./elements";
import {
  NativeModalBackdrop,
  NativeModalButton,
  NativeModalContainer,
  NativeModalHeader,
  NativeModalFooter,
  NativeModalFooterContainer,
} from "../elements";
import { StyledFlex } from "../../../styles/globalElements";
import ModalRoot from "../ModalRoot";

interface IProps {
  showModal: boolean;
  setShowModal: (
    state: boolean
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
}

const Prompt = ({ showModal, setShowModal }: IProps) => {
  return (
    <ModalRoot
      showModal={showModal}
      setShowModal={setShowModal}
      closeModalOnBackdropClick={false}
      showBackDrop={false}
    >
      <NativeModalBackdrop />
      <NativeModalContainer>
        <ModalHeaderContainer>
          <ModalHeaderTitle>Save File</ModalHeaderTitle>
          <ModalHeaderButton>X</ModalHeaderButton>
        </ModalHeaderContainer>
        <ModalContentContainer>
          <ModalContentWrapper>
            <ModalContentMessage>
              Select Directory to add file to
            </ModalContentMessage>
          </ModalContentWrapper>
        </ModalContentContainer>
        <NativeModalFooter>
          <StyledFlex>
            <NativeModalFooterContainer>
              <NativeModalButton>Confirm</NativeModalButton>
              <NativeModalButton>Don't save</NativeModalButton>
              <NativeModalButton>cancel</NativeModalButton>
            </NativeModalFooterContainer>
          </StyledFlex>
        </NativeModalFooter>
      </NativeModalContainer>
    </ModalRoot>
  );
};

export default Prompt;
