import React from "react";
import {
  Input,
  InputBlock,
  InputGroup,
  InputSection,
  InputButton,
  InputButtonGreen,
  ResetButton,
  ShortDataContainer,
  ShortDataGridItem,
  ShortDataGridLabel,
  ShortDataGridText,
  SpanRed,
  SpanGreen,
  UndoButton,
  Group,
} from "./elements";
import Switch from "./Switch";

const BacktestTabContent = () => {
  return (
    <>
      <InputSection>
        <InputBlock>
          <InputGroup>
            <Input value={1} type="number" />
            <InputButton>Add loss</InputButton>
          </InputGroup>
          <InputGroup position="flex-end">
            <Input value={1} type="number" />
            <InputButtonGreen>Add profit</InputButtonGreen>
          </InputGroup>
        </InputBlock>
        <Group>
          <UndoButton>Undo</UndoButton>
          <div>
            <Switch />
          </div>
        </Group>
        <ResetButton>Reset</ResetButton>
      </InputSection>
      <ShortDataContainer>
        <ShortDataGridItem>
          <ShortDataGridLabel>Total Trades</ShortDataGridLabel>
          <ShortDataGridText>20</ShortDataGridText>
        </ShortDataGridItem>
        <ShortDataGridItem>
          <ShortDataGridLabel>Wins / Losses</ShortDataGridLabel>
          <ShortDataGridText>
            <SpanGreen>10</SpanGreen> / <SpanRed>10</SpanRed>
          </ShortDataGridText>
        </ShortDataGridItem>
        <ShortDataGridItem>
          <ShortDataGridLabel>Win rate</ShortDataGridLabel>
          <ShortDataGridText>50%</ShortDataGridText>
        </ShortDataGridItem>
        <ShortDataGridItem>
          <ShortDataGridLabel>Breakeven</ShortDataGridLabel>
          <ShortDataGridText>20</ShortDataGridText>
        </ShortDataGridItem>
      </ShortDataContainer>
    </>
  );
};

export default BacktestTabContent;
