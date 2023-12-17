import styled from "styled-components";
import { StyledFlex } from "../../../styles/globalElements";

export const Container = styled.div`
  width: 90%;
  margin: auto;
  height: 80vh;
  padding: 1rem;
  background-color: #f3f4f6;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
`;
export const CloseModalButton = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-bottom: 1rem;
  display: block;
`;
export const StatContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  height: 320px;
  max-height: 320px;
  overflow-y: auto;
  width: 50%;
  padding: 2rem;
  border-radius: 5px;
`;
export const StatListHeader = styled.h3`
  color: ${({ theme }) => theme.colors.black};
  font-size: 1rem;
  font-weight: 800;
`;
export const StatList = styled.ul`
  list-style: none;
  margin-top: 0.8rem;
  /* max-height: 207px; */
  /* max-height: 305px; */
  /* overflow: auto; */
`;
export const StatListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
`;
export const StatListItemTitle = styled.p`
  font-size: 0.8rem;
`;
export const StatListItemText = styled.p`
  color: ${({ theme }) => theme.colors.accent2};
`;
