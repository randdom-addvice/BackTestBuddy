import styled from "styled-components";

export const Container = styled.section`
  width: 80%;
  margin: auto;
`;
export const Sections = styled.div`
  border-bottom: 1px ${({ theme }) => theme.colors.lightGrey} solid;
  margin-bottom: 1rem;
`;
export const ExpandButton = styled.button`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
`;
export const StatListHeader = styled.h4`
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.9rem;
  font-weight: 800;
`;
export const StatList = styled.ul`
  list-style: none;
  margin-top: 0.8rem;
`;
export const StatListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
`;
export const StatListItemTitle = styled.p`
  font-size: 0.8rem;
`;
export const StatListItemText = styled.p`
  color: ${({ theme }) => theme.colors.accent2};
`;
