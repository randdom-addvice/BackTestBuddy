// ButterUp.tsx
import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfo,
} from "react-icons/fa";

// Define keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Define styled components
const ToastContainer = styled.div`
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  list-style: none;
  outline: none;
  z-index: 999999999;
  position: fixed;
  right: 0;
  top: 20px;
  padding: 5px;
`;

const ToastRack = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  /* reverse the list order so that the newest items are at the top */
  display: flex;
`;

const ToastItem = styled.li<{ type: string }>`
  border-radius: 8px;
  box-shadow: 0 4px 12px #0000001a;
  font-size: 13px;
  align-items: center;
  display: flex;
  padding: 16px;
  border: 1px solid hsl(0, 0%, 93%);
  background-color: white;
  gap: 6px;
  color: #282828;
  width: 325px;
  animation: ${fadeIn} 0.5s ease-in-out;
  border-color: ${({ type }) =>
    type === "success"
      ? "hsl(140, 100%, 27%)"
      : type === "error"
      ? "hsl(0, 100%, 27%)"
      : type === "warning"
      ? "hsl(50, 100%, 27%)"
      : type === "info"
      ? "hsl(210, 100%, 27%)"
      : ""};

  &.fadeOutToast {
    animation: ${fadeOut} 0.5s ease-in-out;
  }

  &.toastUp {
    animation: ${slideUp} 0.5s ease-in-out;
    animation-fill-mode: forwards;
  }

  &.toastDown {
    animation: ${slideDown} 0.5s ease-in-out;
    animation-fill-mode: forwards;
  }

  &.dismissable {
    cursor: pointer;
  }

  ${({ type }) =>
    type === "success" &&
    `
    background-color: #ebfef2;
    color: hsl(140, 100%, 27%);
    border: solid 1px hsl(145, 92%, 91%);
  `}

  ${({ type }) =>
    type === "error" &&
    `
    background-color: #fef0f0;
    color: hsl(0, 100%, 27%);
    border: solid 1px hsl(0, 92%, 91%);
  `}

  ${({ type }) =>
    type === "warning" &&
    `
    background-color: #fffdf0;
    color: hsl(50, 100%, 27%);
    border: solid 1px hsl(50, 92%, 91%);
  `}

  ${({ type }) =>
    type === "info" &&
    `
    background-color: #f0f8ff;
    color: hsl(210, 100%, 27%);
    border: solid 1px hsl(210, 92%, 91%);
  `}
`;

const ToastIcon = styled.div<{ type: string }>`
  margin-right: 12px;

  svg {
    width: 20px;
    height: 20px;
    fill: ${({ type }) =>
      type === "success"
        ? "hsl(140, 100%, 27%)"
        : type === "error"
        ? "hsl(0, 100%, 27%)"
        : type === "warning"
        ? "hsl(50, 100%, 27%)"
        : type === "info"
        ? "hsl(210, 100%, 27%)"
        : ""};
  }
`;

const ToastContent = styled.div<{ type: string }>`
  div {
    color: ${({ type }) =>
      type === "success"
        ? "hsl(140, 100%, 27%)"
        : type === "error"
        ? "hsl(0, 100%, 27%)"
        : type === "warning"
        ? "hsl(50, 100%, 27%)"
        : type === "info"
        ? "hsl(210, 100%, 27%)"
        : ""};
  }
`;

const ToastTitle = styled.div`
  font-weight: bold;
`;

const ToastMessage = styled.div`
  margin-top: 4px;
`;

const getIconByType = (type: string) => {
  switch (type) {
    case "success":
      return <FaCheckCircle />;
    case "error":
      return <FaExclamationCircle />;
    case "warning":
      return <FaExclamationTriangle />;
    case "info":
      return <FaInfo />;
    default:
      return null;
  }
};

interface ToastProps {
  title: string;
  message: string;
  type: string;
  show: boolean;
}

const ToastMessageComponent: React.FC<ToastProps> = ({
  title,
  message,
  type,
  show,
}) => {
  if (!show) return null;
  return (
    <ToastContainer>
      <ToastRack id="butterupRack" className="rack">
        <ToastItem className={`butteruptoast ${type || ""}`} type={type || ""}>
          <ToastIcon type={type}>{getIconByType(type)}</ToastIcon>
          <ToastContent type={type}>
            <ToastTitle>{title}</ToastTitle>
            <ToastMessage>{message}</ToastMessage>
          </ToastContent>
        </ToastItem>
      </ToastRack>
    </ToastContainer>
  );
};
export default ToastMessageComponent;
