import { StyledFlex } from "@/styles/globalElements";
import styled from "styled-components";

export const SidebarContainer = styled.div<{ expanded: boolean }>`
  flex-shrink: 0;
  width: ${(props) => (props.expanded ? "150px" : "56px")};
  height: 100vh;
  border-right: 1px ${({ theme }) => theme.colors.lightGrey} solid;
  transition: width 0.5s ease;
  position: relative;
`;
export const SidebarMenuIcon = styled.div`
  height: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  cursor: pointer;
`;
export const SidebarCategory = styled.div<{ active: boolean }>`
  position: relative;
  margin-bottom: 1rem;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 7px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.accent1};
    opacity: ${({ active }) => (active ? `1` : "0")};
  }
  /* border-left: ${({ theme, active }) =>
    active ? `7px solid ${theme.colors.accent1}` : "none"}; */
  &:hover {
    &::before {
      opacity: 1;
    }
    /* border-left: ${({ theme, active }) =>
      `7px solid ${theme.colors.accent1}`}; */
  }
  a {
    text-decoration: none;
  }
`;
export const ProIconText = styled.div`
  color: ${({ theme }) => theme.colors.accent1};
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
export const IconText = styled.span<{ visible: boolean }>`
  color: ${({ theme }) => theme.colors.accent1};
  display: ${(props) => (props.visible ? "block" : "none")};
  margin-left: 0.5rem;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const SidebarFooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 80%;
  right: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const SidebarFooterName = styled.div`
  font-size: 0.6rem;
  padding: 0.7rem;
  background: green;
  color: #fff;
  border-radius: 50%;
  text-transform: uppercase;
`;
export const SidebarFooterFullName = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.black};
  margin-left: 0.4rem;
`;
export const SidebarFooterLogoutButton = styled.button`
  display: block;
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.6rem 0.2rem;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.accent1};
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.7rem;

  span {
    color: #fff;
  }
  svg {
    font-size: 1rem;
  }
`;
export const SidebarItem = styled(StyledFlex)<{
  expanded: boolean;
}>`
  width: 80%;
  margin: auto;
  /* border: 1px solid; */
  padding: 0.3rem 0.1rem;
  align-items: flex-end;
  border-radius: 4px;
  justify-content: ${(props) => (props.expanded ? "flex-start" : "center")};
`;
