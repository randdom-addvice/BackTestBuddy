import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { NativeModalBackdrop } from "./elements";

const Backdrop = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.7;
  z-index: 5;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 20;
  /* filter: blur(2px); */
`;

interface IProps {
  children: JSX.Element | React.ReactNode;
  closeModalOnBackdropClick?: boolean;
  showBackDrop: boolean;
  showModal: boolean;
  setShowModal: (
    state: boolean
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
  onModalClose?: () => void;
}

const ModalRoot = ({
  children,
  closeModalOnBackdropClick,
  showBackDrop,
  showModal,
  setShowModal,
}: IProps) => {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    throw new Error("Modal root element not found in the document");
  }

  return ReactDOM.createPortal(
    <>
      {showModal && showBackDrop && (
        <Backdrop onClick={() => setShowModal(false)} />
      )}
      {showModal && (
        <>
          {/* <NativeModalBackdrop /> */}
          <ModalOverlay>{children}</ModalOverlay>
        </>
      )}
    </>,
    modalRoot
  );
};

export default ModalRoot;
