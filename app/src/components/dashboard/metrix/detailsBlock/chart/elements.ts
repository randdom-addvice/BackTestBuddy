import styled from "styled-components";

export const Wrapper = styled.div`
  width: 95%;
  margin: 1rem auto;
`;
export const Container = styled.div`
  min-height: 366px;
  max-height: 366px;
  /* max-width: 500px; */
  background-color: #fff;
  border-radius: 0 0 4px 4px;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 100%;
  height: 100%;
`;
export const ContainerHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 14px 14px 0 0;
  /* padding: 1rem; */
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    padding: 1rem 1rem 0 1rem;
    color: ${({ theme }) => theme.colors.primary};
    span {
      color: ${({ theme }) => theme.colors.accent1};
      font-weight: 300;
      font-size: 0.8rem;
    }
  }
`;
export const Tab = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const TabLabel = styled.div<{ isActive: boolean }>`
  font-weight: 400;
  font-size: 0.9rem;
  padding: 0.5rem;
  margin-left: 0.5rem;
  position: relative;
  margin-top: 0.2rem;
  border-radius: 4px 4px 0 0;
  border-bottom: ${(props) =>
    props.isActive ? `3px solid ${props.theme.colors.primary}` : "none"};
  background: ${(props) => (props.isActive ? `#fff` : "initial")};

  cursor: pointer;
`;
