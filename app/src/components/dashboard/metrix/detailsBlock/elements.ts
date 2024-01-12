import styled from "styled-components";

export const Container = styled.section`
  flex: 1;
  background: #f9f9fa;
  overflow-y: auto;

  & > .wrapper {
    background: ${({ theme }) => theme.colors.white};
    border-bottom: 1px ${({ theme }) => theme.colors.lightGrey} solid;
  }
  border-bottom: 1px ${({ theme }) => theme.colors.lightGrey} solid;
`;
export const SectionWrapper = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  margin: auto;
`;

export const HeaderContainer = styled.header`
  width: 97.5%;
  height: 67px;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  /* margin-left: 13px; */
  font-size: 19px;
  font-weight: 700;
  word-wrap: break-word;
`;

export const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;
export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;
export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    content: "";
    border-radius: 50%;
    position: absolute;
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
  }

  ${SwitchInput}:checked + & {
    background-color: #2196f3;
  }

  ${SwitchInput}:focus + & {
    box-shadow: 0 0 1px #2196f3;
  }

  ${SwitchInput}:checked + &:before {
    transform: translateX(26px);
  }
`;

export const SaveButton = styled.button`
  margin-left: 2rem;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;

  &:focus {
    outline: dotted 1px #ddd;
    outline-offset: 0.45rem;
  }
  &:hover {
    outline: dotted 1px #ccc;
    outline-offset: 0.45rem;
  }
`;

export const BalanceTextContainer = styled.div`
  background: ${({ theme }) => theme.colors.accent1};
  padding: 15px 5px 10px 0;
  border-radius: 20px 0px 0px 20px;
  width: 180px;
  color: white;
  word-wrap: break-word;
  text-align: right;
  margin-left: 2rem;
`;
export const Balance = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const BalanceText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 2px;
`;

export const ActionSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const InfoSection = styled.section`
  display: flex;
  align-items: center;
  height: 80px;
  border-bottom: 1px ${({ theme }) => theme.colors.lightGrey} solid;
  padding: 12px 0;
  background: ${({ theme }) => theme.colors.white};
`;
export const InfoBlock = styled.div`
  margin-right: 6rem;
  background: ${({ theme }) => theme.colors.white};
`;
export const InfoLabel = styled.h4`
  color: ${({ theme }) => theme.colors.black};
  font-size: 13px;
  font-weight: 300;
  line-height: normal;
  margin-bottom: 13px;
`;
export const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
