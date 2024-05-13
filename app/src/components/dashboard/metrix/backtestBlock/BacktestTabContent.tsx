import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
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
import { Direction, TradeSequenceDetail, TradeStats } from "@/graphql/api";
import { strategyActions } from "@/redux/reducers/strategy/strategySlice";
import useStrategyMetrix from "@/hooks/strategy/useStrategyMetrix";
import { UseMetricsInputLocalStorage } from "@/utils/storage";
import InputPromptModal from "@/components/modal/InfoModal/InfoModal";
import { useResetStrategyStatsMutationHook, useUndoLastStrategyStatsMutationHook } from "@/graphql/mutations/strategy/strategy.mutations";

interface TradeDetail {
  commission: number;
  asset: string;
  direction: Direction;
  lossValue: number;
  profitValue: number;
  valueType: "percent" | "dollar";
}

interface IProps {
  tradeStats: TradeStats;
  metrics_id: string
}

const metricsLocalStorage = UseMetricsInputLocalStorage.getInstance();

const BacktestTabContent: React.FC<IProps> = ({ tradeStats, metrics_id }) => {
  const dispatch = useAppDispatch();
  const [showResetModal, setShowResetModal] = useState(false);
  const [tradeDetail, setTradeDetail] = useState<TradeDetail>({
    direction: metricsLocalStorage.getInputDirection(),
    asset: metricsLocalStorage.getInputAsset(),
    commission: metricsLocalStorage.getInputCommisssion(),
    lossValue: metricsLocalStorage.getInputLossValue(),
    profitValue: metricsLocalStorage.getInputProfitValue(),
    valueType: metricsLocalStorage.getInputValueType(),
  });
  const [tradeStatsToUpdate, setTradeStatsToUpdate] = useState<
    TradeSequenceDetail[]
  >([]);
  const {resetStrategyStatsMutation} = useResetStrategyStatsMutationHook({resetStrategyStatsId: metrics_id})
  const {undoLastStrategyStatsMutation} = useUndoLastStrategyStatsMutationHook({undoLastStrategyStatsId: metrics_id})
  const metrix = useStrategyMetrix(tradeStats);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTradeDetail({ ...tradeDetail, [e.target.name]: e.target.value });
    switch (e.target.name) {
      case "asset":
        metricsLocalStorage.setInputAsset(e.target.value);
        break;
      case "commission":
        metricsLocalStorage.setInputCommission(parseFloat(e.target.value));
        break;
      case "direction":
        metricsLocalStorage.setInputDirection(e.target.value as Direction);
        break;
      case "lossValue":
        metricsLocalStorage.setInputLossValue(parseFloat(e.target.value));
        break;
      case "profitValue":
        metricsLocalStorage.setInputProfitValue(parseFloat(e.target.value));
        break;
      case "valueType":
        metricsLocalStorage.setInputValueType(
          e.target.value as "percent" | "dollar"
        );
        break;
      default:
        break;
    }
  }

  const updateTradeCount = useCallback(
    (isWinCount: boolean) => {
      const profitValue =
        tradeDetail.valueType === "dollar"
          ? (Math.abs(Number(tradeDetail.profitValue)) /
            tradeStats.initialBalance) *
          100
          : Number(tradeDetail.profitValue);
      const lossValue =
        tradeDetail.valueType === "dollar"
          ? (Number(-Math.abs(tradeDetail.lossValue)) /
            tradeStats.initialBalance) *
          100
          : Number(-Math.abs(tradeDetail.lossValue));
      const trade: TradeSequenceDetail = {
        asset: tradeDetail.asset,
        commission: Number(tradeDetail.commission),
        value: isWinCount ? profitValue : lossValue,
        direction: tradeDetail.direction,
      };
      dispatch(strategyActions.setTempStrategyStatsToUpdate(trade));
    },
    [dispatch, tradeDetail]
  );

  const debouncedUpdateReduxStore = useCallback(
    debounce(updateTradeCount, 500),
    [updateTradeCount]
  );

  function addProfit() {
    updateTradeCount(true);
  }
  function addLoss() {
    updateTradeCount(false);
  }
  function undoLastAction() {
    undoLastStrategyStatsMutation()
    dispatch(strategyActions.undoLastTradeUpdate())
  }
  function resetStats() {
    setShowResetModal(true)
  }

  useEffect(() => {
    console.log(tradeDetail.lossValue, "xxx");
    // console.log(metrix.growth, "xxx");
  }, [tradeStats]);

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
            <InputButton onClick={addLoss}>Add loss {tradeDetail.valueType === "dollar" ? "$" : "%"}</InputButton>
          </InputGroup>
          <InputGroup position="flex-end">
            <Input
              onChange={handleChange}
              value={tradeDetail.profitValue}
              name="profitValue"
              type="number"
            />
            <InputButtonGreen onClick={addProfit}>Add profit {tradeDetail.valueType === "dollar" ? "$" : "%"}</InputButtonGreen>
          </InputGroup>
        </InputBlock>
        <Group>
          <UndoButton onClick={undoLastAction}>Undo</UndoButton>
          <ResetButton onClick={resetStats}>Reset</ResetButton>
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
              defaultValue={tradeDetail.asset}
            />
          </li>

          <li>
            <div>Commission</div>
            <input
              name="commission"
              onChange={handleChange}
              type="number"
              defaultValue={tradeDetail.commission}
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
                defaultChecked={tradeDetail.direction === Direction.Long}
              />
              <label htmlFor="direction-long">Long</label>
              <input
                onChange={handleChange}
                type="radio"
                name="direction"
                value={Direction.Short}
                id="direction-short"
                defaultChecked={tradeDetail.direction === Direction.Short}
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
                defaultChecked={tradeDetail.valueType === "percent"}
                onChange={handleChange}
              />
              <label htmlFor="valueType-percent">Percent</label>
              <input
                type="radio"
                name="valueType"
                value="dollar"
                id="valueType-dollar"
                defaultChecked={tradeDetail.valueType === "dollar"}
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
          <ShortDataGridText>{metrix?.totalTrades}</ShortDataGridText>
        </ShortDataGridItem>
        <ShortDataGridItem>
          <ShortDataGridLabel>Wins / Losses</ShortDataGridLabel>
          <ShortDataGridText>
            <SpanGreen>{metrix?.totalWinnings}</SpanGreen> /{" "}
            <SpanRed>{metrix?.totalLosses}</SpanRed>
          </ShortDataGridText>
        </ShortDataGridItem>
        <ShortDataGridItem>
          <ShortDataGridLabel>Win rate</ShortDataGridLabel>
          <ShortDataGridText>{metrix?.winRate}%</ShortDataGridText>
        </ShortDataGridItem>
        <ShortDataGridItem>
          <ShortDataGridLabel>Breakeven</ShortDataGridLabel>
          <ShortDataGridText>{metrix?.breakEvenCount}</ShortDataGridText>
        </ShortDataGridItem>
      </ShortDataContainer>

      <InputPromptModal
        headerTitle="Reset Metrix"
        onSubmit={() => {
          dispatch(strategyActions.resetAllStrategyStatsData())
          resetStrategyStatsMutation()
          setShowResetModal(false)
        }}
        showModal={showResetModal}
        setShowModal={setShowResetModal}
      >
        <p>
          Are you sure you want to reset the current metrix data?
        </p>
        <p style={{marginTop: "0.5rem"}}>This action is irreversible, are you sure you want to proceed?</p>
      </InputPromptModal>
    </>
  );
};

export default BacktestTabContent;
