import styled from "styled-components";

export const SidebarContainer = styled.div`
  flex-shrink: 0;
  width: 56px;
  height: 100vh;
  border-right: 1px ${({ theme }) => theme.colors.lightGrey} solid;
`;

export const SidebarMenuIcon = styled.div`
  height: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

export const SidebarItem = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SidebarCategory = styled.div`
  margin-bottom: 52px;
  cursor: pointer;
`;

export const ProIconText = styled.div`
  color: ${({ theme }) => theme.colors.accent1};
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
