import styled from "styled-components";

export type StrategyCardType = {
  id: string;
  libraryId: string;
  name: string;
  description: string;
  totalTrades: number;
  percentageWin: number;
  profitGain: number;
};

export const PromptInputGroup = styled.div`
  margin-bottom: 1rem;
  p {
    color: ${({ theme }) => theme.colors.red};
    margin-top: 0.5rem;
    font-size: 0.7rem;
  }
  p.loading {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.mainDark};
  }
`;
export const PromptInput = styled.input`
  width: 100%;
  padding: 0.6rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 4px;
  display: block;
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.accent1};
    outline: none;
  }
  &::placeholder {
    font-family: Arial, Helvetica, sans-serif;
  }
`;
export const PromptTextArea = styled.textarea`
  width: 100%;
  padding: 0.6rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 4px;
  display: block;
  resize: none;
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.accent1};
    outline: none;
  }
  &::placeholder {
    font-family: Arial, Helvetica, sans-serif;
  }
`;
