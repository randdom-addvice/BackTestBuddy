import styled from "styled-components";
import { IoCloseCircleOutline } from "react-icons/io5";

export const ErrorContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 0.5rem;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.2rem;
  background-color: ${({ theme }) => theme.colors.red};
  z-index: 1000;
`;
export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.7rem;
  margin-right: 1rem;
`;
export const ErrorCloseBtn = styled(IoCloseCircleOutline)`
  color: ${({ theme }) => theme.colors.white};
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  background: #fff;
  border-radius: 50%;
`;
