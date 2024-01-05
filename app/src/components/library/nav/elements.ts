import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
`;
export const StyledButtonWrapper = styled.section`
  height: 3.5vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;
export const StyledButton = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.primary};
  margin: auto;
  padding: 0.4rem;
  cursor: pointer;
`;
export const HeaderWrapper = styled.header`
  line-height: 0.8;
  margin-bottom: 4rem;
  margin-top: 2rem;
  text-align: center;
`;
export const Header = styled.header`
  font-size: 1.5rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.primary};
`;
