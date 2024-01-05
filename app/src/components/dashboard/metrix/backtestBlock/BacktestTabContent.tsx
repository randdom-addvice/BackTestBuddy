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
import { useAppSelector } from "@/redux/hooks";

const BacktestTabContent = () => {
  const state = useAppSelector((state) => state.strategy);
  const { tradeStats } = state.selectedStrategyMetrix || {};

  if (!state.selectedStrategyMetrix) return null;
  return (
    <>
      <InputSection>
        <InputBlock>
          <InputGroup>
            <Input value={tradeStats?.lossCountValue} type="number" />
            <InputButton>Add loss</InputButton>
          </InputGroup>
          <InputGroup position="flex-end">
            <Input value={tradeStats?.winCountValue} type="number" />
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
          <ShortDataGridText>{tradeStats?.totalTrades}</ShortDataGridText>
        </ShortDataGridItem>
        <ShortDataGridItem>
          <ShortDataGridLabel>Wins / Losses</ShortDataGridLabel>
          <ShortDataGridText>
            <SpanGreen>{tradeStats?.totalWinnings}</SpanGreen> /{" "}
            <SpanRed>{tradeStats?.totalLosses}</SpanRed>
          </ShortDataGridText>
        </ShortDataGridItem>
        <ShortDataGridItem>
          <ShortDataGridLabel>Win rate</ShortDataGridLabel>
          <ShortDataGridText>
            {tradeStats?.totalWinningsPercent}%
          </ShortDataGridText>
        </ShortDataGridItem>
        <ShortDataGridItem>
          <ShortDataGridLabel>Breakeven</ShortDataGridLabel>
          <ShortDataGridText>0</ShortDataGridText>
        </ShortDataGridItem>
      </ShortDataContainer>
    </>
  );
};

export default BacktestTabContent;
