import React from "react";
import { IoCloudDoneOutline } from "react-icons/io5";

import {
  ActionSection,
  Balance,
  BalanceText,
  BalanceTextContainer,
  Container,
  HeaderContainer,
  InfoBlock,
  InfoLabel,
  InfoSection,
  InfoText,
  SaveButton,
  SectionWrapper,
  Title,
} from "./elements";
import Switch from "./Switch";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { shortenText } from "@/utils/text";
import GrowthChart from "./chart/GrowthChart";
import AnalyticsCharts from "./chart/analyticsChart/AnalyticsCharts";
import { TradeStats } from "@/graphql/api";
import useStrategyMetrix from "@/hooks/strategy/useStrategyMetrix";
import { useUpdateStrategyStatsMutationHook } from "@/graphql/mutations/strategy/strategy.mutations";
import { strategyActions } from "@/redux/reducers/strategy/strategySlice";

interface IProps {
  tradeStats: TradeStats;
}

const DetailsBlock: React.FC<IProps> = ({ tradeStats }) => {
  const state = useAppSelector((state) => state.strategy);
  const dispatch = useAppDispatch();
  const { updateStrategyStatsMutation, loading } =
    useUpdateStrategyStatsMutationHook(
      {},
      {
        onCompleted(data) {
          if (data.updateStrategyStats) {
            dispatch(strategyActions.resetTempStrategyStatsToUpdate());
          }
        },
      }
    );

  const metrix = state.selectedStrategyMetrix;
  const { balance } = useStrategyMetrix(tradeStats);

  async function updateStrategyStats() {
    try {
      if (!metrix) return;
      updateStrategyStatsMutation({
        variables: {
          updateStrategyStatsInput: {
            strategy_id: metrix?._id,
            tradesSequence: state.tempStrategyStatsToUpdate,
          },
        },
      });
    } catch (error) {
      alert("something went wrong");
    }
  }

  return (
    <Container>
      <div className="wrapper">
        <HeaderContainer>
          <Title>BackTest Section</Title>
          <ActionSection>
            {/* <Switch /> */}
            <SaveButton onClick={updateStrategyStats}>
              <IoCloudDoneOutline size="25px" />
            </SaveButton>
            <BalanceTextContainer title={balance.toLocaleString()}>
              <Balance>$ {shortenText(balance.toLocaleString(), 10)}</Balance>
              <BalanceText>Current Balance</BalanceText>
            </BalanceTextContainer>
          </ActionSection>
        </HeaderContainer>
      </div>
      <InfoSection>
        <SectionWrapper>
          <InfoBlock>
            <InfoLabel>Strategy Name</InfoLabel>
            <InfoText>{metrix?.name}</InfoText>
          </InfoBlock>
          <InfoBlock>
            <InfoLabel>Description</InfoLabel>
            <InfoText title={metrix?.description}>
              {shortenText(metrix?.description ?? "", 25)}
            </InfoText>
          </InfoBlock>
        </SectionWrapper>
      </InfoSection>
      {tradeStats && (
        <>
          <GrowthChart tradeStats={tradeStats} />
          <AnalyticsCharts />
        </>
      )}
      {/* <Chart /> */}
    </Container>
  );
};
export default DetailsBlock;
