import React, {
  useCallback,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { ErrorCloseBtn, ErrorContainer, ErrorMessage } from "./elements";

interface ErrorNotifierProps {
  showError: boolean;
  setShowError: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
}

const GlobalErrorMessageToast: React.FC<ErrorNotifierProps> = ({
  errorMessage,
  setShowError,
  showError,
}) => {
  return (
    <>
      {showError ? (
        <ErrorContainer>
          <ErrorMessage role="alert">{errorMessage}</ErrorMessage>
          <ErrorCloseBtn onClick={() => setShowError(false)} />
        </ErrorContainer>
      ) : null}
    </>
  );
};
export default GlobalErrorMessageToast;
