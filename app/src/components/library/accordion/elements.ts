import { Link } from "react-router-dom";
import styled from "styled-components";

export const AccordionContainer = styled.div`
  width: 90%;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
  margin-bottom: 5rem;
`;

export const AccordionDetails = styled.details`
  & > div {
    border-left: 2px solid #000;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    padding: 1.5em;
  }

  /* div > * + * {
    margin-top: 1.5em;
  } */

  + details {
    margin-top: 0.5rem;
  }
  & * {
    user-select: none;
  }
`;

export const AccordionSummary = styled.summary`
  list-style: none;
  border: 2px solid #000;
  padding: 0.75em 1em;
  cursor: pointer;
  position: relative;
  padding-left: calc(1.75rem + 0.75rem + 0.75rem);

  input {
    width: 80%;
    border: none;
    &:hover {
      background-color: #eee;
    }
    &:focus {
      outline: none;
    }
  }

  &:before {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0.75rem;
    content: "↓";
    width: 1.75rem;
    height: 1.75rem;
    background-color: #000;
    color: #fff;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  &:hover {
    background-color: #eee;
    input {
      background-color: #eee;
    }
  }

  &[open] {
    background-color: #eee;
  }

  &[open]:before {
    content: "↑";
  }
`;

export const AccordionContent = styled.div`
  code {
    font-family: monospace;
    font-weight: 600;
  }
`;
export const AccordionContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
export const AccordionInput = styled.input`
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;
export const Description = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  span {
    font-size: 0.7rem;
    font-weight: 500;
  }
`;
//CARD
export const CardContainer = styled.article`
  border-radius: 5px;
  box-shadow: 0 30px 40px -20px #a3a5ae;
  margin: 20px 0;
  padding: 15px 30px;
  width: 300px;
  border-top: 3px solid #000;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  margin-left: 0.5rem;
  svg {
    fill: red;
  }
`;

export const EditButton = styled(DeleteButton)`
  svg {
    fill: grey;
  }
`;

export const Title = styled.h5`
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  margin: 0.5rem 0 0.7rem 0;
`;

export const DescriptionText = styled.p`
  font-size: 0.7rem;
  font-weight: 300;
  margin-bottom: 1rem;
`;

export const StatisticsList = styled.ul`
  color: #4c4e61;
  list-style-type: disclosure-closed;
  list-style-type: none;
  /* padding-left: 2rem; */
  margin: 1rem 0;
`;

export const StatisticsListItem = styled.li`
  font-size: 0.6rem;
  margin-bottom: 0.5rem;
`;

export const ViewLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  margin-top: 10px;
  font-weight: 400;
  font-size: 0.7rem;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;
