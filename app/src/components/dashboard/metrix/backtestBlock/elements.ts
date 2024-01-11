import { StyledCenteredDiv } from "@/styles/globalElements";
import styled from "styled-components";
import { keyframes } from "styled-components";

const rippleAnimation = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

export const Container = styled.div`
  overflow-y: auto;
  flex-shrink: 0;
  width: 300px;
  height: 100vh;
  border-right: 1px ${({ theme }) => theme.colors.lightGrey} solid;
`;

export const BrandSectionContainer = styled(StyledCenteredDiv)`
  width: 100%;
  height: 67px;
  border-bottom: 1px ${({ theme }) => theme.colors.lightGrey} solid;
  justify-content: flex-start;
`;

export const TabContainer = styled.div`
  /* border-bottom: 1px ${({ theme }) => theme.colors.lightGrey} solid; */
`;
export const TabWrapper = styled.div`
  border-bottom: 1px ${({ theme }) => theme.colors.lightGrey} solid;
`;
export const TabLabel = styled.div<{ isActive: boolean }>`
  padding: 8px 16px;
  border-bottom: ${(props) =>
    props.isActive ? `6px solid ${props.theme.colors.accent1}` : "none"};
  cursor: pointer;
`;

export const TabContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 12px auto;
  margin-bottom: 0;
`;

export const TabContent = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 20px;
`;

export const InputSection = styled.section`
  width: 100%;
  margin: 21px auto;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  padding: 20px;
`;

export const InputBlock = styled(StyledCenteredDiv)``;
export const InputGroup = styled(StyledCenteredDiv)<{ position?: string }>`
  justify-content: flex-end;
  flex-direction: column;
  align-items: ${(props) => props.position ?? "flex-start"};
`;

export const Input = styled.input`
  width: 132px;
  height: 34px;
  border-radius: 6px;
  width: 75%;
  height: 25px;
  border: 1px solid ${({ theme }) => theme.colors.accent1};
  margin-bottom: 10px;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
  text-align: center;
`;

export const InputButton = styled.button`
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.red};
  border: none;
  width: 85px;
  height: 45px;
  outline: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  background-position: center;
  transition: background 0.8s;

  &:hover {
    background: #dc2230 radial-gradient(circle, transparent 1%, #dc2230 1%)
      center/15000%;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.red};
    background-size: 100%;
    transition: background 0s;
  }
`;
export const InputButtonGreen = styled(InputButton)`
  background: ${({ theme }) => theme.colors.accent1};
  &:hover {
    background: #238635 radial-gradient(circle, transparent 1%, #238635 1%)
      center/15000%;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.accent1};
    background-size: 100%;
    transition: background 0s;
  }
`;
export const ResetButton = styled(InputButton)`
  margin: 15px 0 auto;
  display: block;
  /* width: 45%; */
  background: ${({ theme }) => theme.colors.grey};
  &:hover {
    background: #514b3a radial-gradient(circle, transparent 1%, #514b3a 1%)
      center/15000%;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.grey};
    background-size: 100%;
    transition: background 0s;
  }
`;
export const UndoButton = styled(ResetButton)``;

export const ShortDataContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
export const ShortDataGridItem = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  padding: 15px 10px;
`;

export const ShortDataGridLabel = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-size: 1rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  margin-bottom: 1rem;
`;
export const ShortDataGridText = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const SpanRed = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;
export const SpanGreen = styled.span`
  color: ${({ theme }) => theme.colors.accent1};
`;
export const Group = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-top: 0.2rem; */
`;
export const StyledUl = styled.div`
  list-style: none;
  width: 100%;
  li {
    width: 100%;
    margin-bottom: 1rem;
    & > div {
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.mainDark};
    }
    /* display: flex;
    justify-content: space-between; */
    strong {
      display: inline-block;
      flex-basis: 50%;
      margin-left: 0;
      text-align: left;
      border: 1px solid;
    }
    input[type="text"],
    input[type="number"] {
      width: 100%;
      padding: 0.4rem 0.3rem;
      border-radius: 3px;
      border: 1px solid ${({ theme }) => theme.colors.lightGrey};
      &:focus {
        outline: none;
        border: 1px solid ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;
export const StyledToggle = styled.div`
  margin: 0 0 1.5rem;
  box-sizing: border-box;
  font-size: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  input {
    width: 0;
    height: 0;
    position: absolute;
    left: -9999px;
  }

  input + label {
    cursor: pointer;
    width: 100%;
    margin: 0;
    padding: 0.75rem 1rem;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    border: solid 1px #ddd;
    background-color: #fff;
    font-size: 1rem;
    line-height: 140%;
    font-weight: 600;
    text-align: center;
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
    transition: border-color 0.15s ease-out, color 0.25s ease-out,
      background-color 0.15s ease-out, box-shadow 0.15s ease-out;

    &:first-of-type {
      border-radius: 6px 0 0 6px;
      border-right: none;
    }

    &:last-of-type {
      border-radius: 0 6px 6px 0;
      border-left: none;
    }
  }

  input:hover + label {
    border-color: #213140;
  }

  input:checked + label {
    background-color: #4b9dea;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    box-shadow: 0 0 10px rgba(102, 179, 251, 0.5);
    border-color: #4b9dea;
    z-index: 1;
  }

  input:focus + label {
    outline: dotted 1px #ccc;
    outline-offset: 0.45rem;
  }

  @media (max-width: 800px) {
    input + label {
      padding: 0.75rem 0.25rem;
      flex: 0 0 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
