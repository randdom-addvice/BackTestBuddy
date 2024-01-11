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
  StyledUl,
  StyledToggle,
} from "./elements";
import Switch from "./Switch";
import { useAppSelector } from "@/redux/hooks";
import { StyledFlex } from "@/styles/globalElements";

import styled from "styled-components";

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
          <ResetButton>Reset</ResetButton>
        </Group>
      </InputSection>
      <InputSection>
        {/* <InputBlock>
          <InputGroup>
            <Input value={tradeStats?.lossCountValue} type="number" />
          </InputGroup>
          <InputGroup position="flex-end">
            <Input value={tradeStats?.winCountValue} type="number" />
          </InputGroup>
        </InputBlock> */}
        <StyledUl>
          <li>
            <div>Asset</div>
            <input type="text" />
          </li>
          <li>
            <div>Commission</div>
            <input type="number" />
          </li>
          <li>
            <div>Direction</div>
            <StyledToggle>
              <input
                type="radio"
                name="direction"
                value="LONG"
                id="direction-long"
                defaultChecked
              />
              <label htmlFor="direction-long">Long</label>
              <input
                type="radio"
                name="direction"
                value="SHORT"
                id="direction-short"
              />
              <label htmlFor="direction-short">Short</label>
            </StyledToggle>
          </li>
          <li>
            <div>Value Type</div>
            <StyledToggle>
              <input
                type="radio"
                name="valueType"
                value="percent"
                id="valueType-percent"
                defaultChecked
              />
              <label htmlFor="valueType-percent">Percent</label>
              <input
                type="radio"
                name="valueType"
                value="dollar"
                id="valueType-dollar"
              />
              <label htmlFor="valueType-dollar">Dollar</label>
            </StyledToggle>
          </li>
        </StyledUl>
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
          <ShortDataGridText>
            {tradeStats?.tradesSequence.filter((i) => i.value === 0).length}
          </ShortDataGridText>
        </ShortDataGridItem>
      </ShortDataContainer>
    </>
  );
};

export default BacktestTabContent;
