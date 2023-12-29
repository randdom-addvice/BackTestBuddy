import styled from "styled-components";

const ToggleButtonCover = styled.div`
  position: relative;
  width: fit-content;
  box-sizing: border-box;
`;

const ButtonCover = styled.div`
  border-radius: 4px;
  position: relative;

  &:before {
    counter-increment: button-counter;
    content: counter(button-counter);
    /* position: absolute; */
    right: 0;
    bottom: 0;
    color: #d7e3e3;
    font-size: 12px;
    line-height: 1;
    padding: 5px;
  }
`;

const Button = styled.div`
  position: relative;
  top: 50%;
  width: 74px;
  height: 36px;
  margin: -20px auto 0 auto;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.lightGrey};

  &.r,
  &.r .layer {
    border-radius: 100px;
  }
`;

const Checkbox = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
`;

const Knobs = styled.div`
  z-index: 2;
`;

const Layer = styled.div`
  width: 100%;
  background-color: #ebf7fc;
  transition: 0.3s ease all;
  z-index: 1;
`;

const ButtonSwitch = styled(Button)`
  .knobs:before {
    content: "$";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 10px;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    background-color: #03a9f4;
    border-radius: 50%;
    transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
  }

  .checkbox:checked + .knobs:before {
    content: "%";
    left: 42px;
    background-color: #f44336;
  }

  .checkbox:checked ~ .layer {
    background-color: #fcebeb;
  }

  .knobs,
  .knobs:before,
  .layer {
    transition: 0.3s ease all;
  }
`;

const Switch = () => {
  return (
    <ToggleButtonCover className="toggle-button-cover">
      <ButtonCover className="button-cover">
        <ButtonSwitch className="button r" id="button-1">
          <Checkbox type="checkbox" className="checkbox" />
          <Knobs className="knobs"></Knobs>
          <Layer className="layer"></Layer>
        </ButtonSwitch>
      </ButtonCover>
    </ToggleButtonCover>
  );
};

export default Switch;
