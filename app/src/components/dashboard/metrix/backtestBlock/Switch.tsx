import styled from "styled-components";

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 60px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;
const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.accent1};
  transition: 0.4s;
  border-radius: 4px;
  &:before {
    content: "Long";
    font-size: 13px;
    text-align: center;
    position: absolute;
    height: 40%;
    width: 90%;
    margin: auto;
    left: 2px;
    right: 2px;
    bottom: 4px;
    background-color: #faf0f0;
    transition: 0.4s;
    border-radius: 2px;
  }
  ${SwitchInput}:checked + & {
    background-color: ${({ theme }) => theme.colors.red};
  }

  ${SwitchInput}:focus + & {
    box-shadow: 0 0 1px ${({ theme }) => theme.colors.red};
  }
  ${SwitchInput}:checked + &:before {
    transform: translateY(-26px);
    content: "Short";
  }
`;

const Switch = () => {
  return (
    <>
      <SwitchLabel>
        <SwitchInput type="checkbox" />
        <Slider></Slider>
      </SwitchLabel>
    </>
  );
};

export default Switch;
