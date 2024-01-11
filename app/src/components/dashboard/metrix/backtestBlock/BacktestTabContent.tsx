import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { StyledFlex } from "@/styles/globalElements";
import { Direction, TradeSequenceDetail } from "@/graphql/api";
import { strategyActions } from "@/redux/reducers/strategy/strategySlice";

interface TradeDetail {
  commission: number;
  asset: string;
  direction: Direction;
  lossValue: number;
  profitValue: number;
  valueType: "percent" | "dollar";
}

const BacktestTabContent = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.strategy);
  const [tradeDetail, setTradeDetail] = useState<TradeDetail>({
    direction: Direction.Long,
    asset: "EURUSD",
    commission: 0,
    lossValue: 1,
    profitValue: 1,
    valueType: "percent",
  });
  // const [direction, setDirection] = useState<Direction.Long | Direction.Short>(
  //   Direction.Long
  // );
  // const [assetName, setAssetName] = useState("");
  // const [commission, setCommission] = useState(0);
  const [tradeStatsToUpdate, setTradeStatsToUpdate] = useState<
    TradeSequenceDetail[]
  >([]);
  const { tradeStats } = state.selectedStrategyMetrix || {};

  useCallback(() => {}, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTradeDetail({ ...tradeDetail, [e.target.name]: e.target.value });
  }

  function addProfit() {
    const trade: TradeSequenceDetail = {
      asset: tradeDetail.asset,
      commission: tradeDetail.commission,
      value: tradeDetail.profitValue,
      direction: tradeDetail.direction,
    };
    dispatch(strategyActions.setTempStrategyStatsToUpdate(trade));
    console.log(trade);
  }
  function addLoss() {}

  useEffect(() => {
    console.log(tradeStats, "tradeStats");
  }, [tradeStats]);

  if (!state.selectedStrategyMetrix) return null;
  return (
    <>
      <InputSection>
        <InputBlock>
          <InputGroup>
            <Input
              onChange={handleChange}
              value={tradeDetail.lossValue}
              name="lossValue"
              type="number"
            />
            <InputButton onClick={addLoss}>Add loss</InputButton>
          </InputGroup>
          <InputGroup position="flex-end">
            <Input
              onChange={handleChange}
              value={tradeDetail.profitValue}
              name="profitValue"
              type="number"
            />
            <InputButtonGreen onClick={addProfit}>Add profit</InputButtonGreen>
          </InputGroup>
        </InputBlock>
        <Group>
          <UndoButton>Undo</UndoButton>
          <ResetButton>Reset</ResetButton>
        </Group>
      </InputSection>
      <InputSection>
        <StyledUl>
          <li>
            <div>Asset</div>
            <input
              type="text"
              name="asset"
              onChange={handleChange}
              defaultValue="EURUSD"
            />
          </li>

          <li>
            <div>Commission</div>
            <input
              name="commission"
              onChange={handleChange}
              type="number"
              defaultValue={0}
            />
          </li>
          <li>
            <div>Direction</div>
            <StyledToggle>
              <input
                onChange={handleChange}
                type="radio"
                name="direction"
                value={Direction.Long}
                id="direction-long"
                defaultChecked
              />
              <label htmlFor="direction-long">Long</label>
              <input
                onChange={handleChange}
                type="radio"
                name="direction"
                value={Direction.Short}
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
                onChange={handleChange}
              />
              <label htmlFor="valueType-percent">Percent</label>
              <input
                type="radio"
                name="valueType"
                value="dollar"
                id="valueType-dollar"
                onChange={handleChange}
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
