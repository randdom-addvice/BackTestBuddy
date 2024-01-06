import styled from "styled-components";

export const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const StyledModalContainer = styled.article`
  max-height: 90vh;
  max-width: 550px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.25);

  @media (max-width: 600px) {
    width: 90%;
  }
`;

export const StyledModalContainerHeader = styled.header`
  padding: 16px 32px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledModalContainerTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1;
  font-weight: 700;
  font-size: 1.125rem;

  svg {
    width: 32px;
    height: 32px;
    color: #750550;
  }
`;

export const StyledModalContainerBody = styled.section`
  padding: 24px 32px 51px;
  overflow-y: auto;
`;

export const StyledModalContainerFooter = styled.footer`
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #ddd;
  gap: 12px;
  position: relative;

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: -51px;
    left: 24px;
    right: 24px;
    height: 50px;
    flex-shrink: 0;
    background-image: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.75),
      transparent
    );
    pointer-events: none;
  }
`;

export const StyledButton = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  background-color: transparent;
  border: 0;
  font-weight: 600;
  cursor: pointer;
  transition: 0.15s ease;

  &.is-secondary {
    &:hover {
      background-color: ${({ theme }) => theme.colors.mediumGrey};
    }
    &:focus {
      box-shadow: 0 0 0 0.25rem ${({ theme }) => theme.colors.mediumGrey};
    }
  }

  &.is-primary {
    background-color: ${({ theme }) => theme.colors.accent1};
    color: #fff;
    &:hover {
      background-color: ${({ theme }) => theme.colors.accent3};
    }
    &:focus {
      background-color: ${({ theme }) => theme.colors.accent1};
      box-shadow: 0 0 0 0.25rem ${({ theme }) => theme.colors.accent3};
    }
  }
`;

export const StyledIconButton = styled.button`
  padding: 0;
  border: 0;
  background-color: transparent;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.15s ease;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.mediumGrey};
  }
`;
