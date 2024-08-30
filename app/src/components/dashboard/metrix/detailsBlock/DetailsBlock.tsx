import React, { useEffect, useState } from "react";
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
  Spinner,
  Title,
} from "./elements";
import Switch from "./Switch";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeHTMLTags, shortenText } from "@/utils/text";
import GrowthChart from "./chart/GrowthChart";
import AnalyticsCharts from "./chart/analyticsChart/AnalyticsCharts";
import { TradeStats } from "@/graphql/api";
import useStrategyMetrix from "@/hooks/strategy/useStrategyMetrix";
import { useUpdateStrategyStatsMutationHook } from "@/graphql/mutations/strategy/strategy.mutations";
import { strategyActions } from "@/redux/reducers/strategy/strategySlice";
import RichTextPreviewModal from "@/components/global/editor/RichTextPreviewModal";

interface IProps {
  tradeStats: TradeStats;
}

const DetailsBlock: React.FC<IProps> = ({ tradeStats }) => {
  const [showRichTextPreviewModal, setShowRichTextPreviewModal] =
    useState(false);
  const state = useAppSelector((state) => state.strategy);
  const dispatch = useAppDispatch();
  const { updateStrategyStatsMutation, loading, error } =
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

  function viewExpanded() {
    setShowRichTextPreviewModal(true);
  }

  return (
    <Container>
      <div className="wrapper">
        <HeaderContainer>
          <Title>BackTest Section</Title>
          {error && <span>unable to save try again</span>}
          <ActionSection>
            {loading ? (
              <Spinner />
            ) : (
              <SaveButton title="save" onClick={updateStrategyStats}>
                <IoCloudDoneOutline size="25px" />
              </SaveButton>
            )}

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
              {shortenText(removeHTMLTags(metrix?.description ?? ""), 25)}
              <button onClick={viewExpanded}>view expanded</button>
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
      <RichTextPreviewModal
        showRichTextPreviewModal={showRichTextPreviewModal}
        setShowRichTextPreviewModal={setShowRichTextPreviewModal}
        richText={metrix?.description ?? ""}
      />
    </Container>
  );
};
export default DetailsBlock;
