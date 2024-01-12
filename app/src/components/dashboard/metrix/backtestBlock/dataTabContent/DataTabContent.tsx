import React, { useState } from "react";
import { FaExpand } from "react-icons/fa";
import {
  Container,
  Sections,
  StatList,
  StatListHeader,
  StatListItem,
  StatListItemText,
  StatListItemTitle,
  ExpandButton,
} from "./elements";
import { StyledFlex } from "@/styles/globalElements";
import ExpandedDataModal from "@/components/modal/ExpandedDataModal/ExpandedDataModal";
import { useAppSelector } from "@/redux/hooks";
import AdvancedDataMetrix from "@/components/dashboard/metrix/backtestBlock/advancedDataMetrix/AdvancedDataMetrix";
import { shortenText } from "@/utils/text";
import { TradeStats } from "@/graphql/api";
import useStrategyMetrix from "@/hooks/strategy/useStrategyMetrix";

interface IProps {
  tradeStats: TradeStats;
}

const DataTabContent: React.FC<IProps> = ({ tradeStats }) => {
  const [showExpandedData, setShowExpandedData] = useState(false);
  const metrix = useStrategyMetrix(tradeStats);
  return (
    <Container>
      <Sections>
        <StyledFlex>
          <StatListHeader>General</StatListHeader>
          <ExpandButton
            title="view enlarged details"
            onClick={() => setShowExpandedData(true)}
          >
            <FaExpand />
          </ExpandButton>
        </StyledFlex>
        <StatList>
          <StatListItem>
            <StatListItemTitle>Gain: </StatListItemTitle>
            <StatListItemText title={metrix.profitGain.toString()}>
              {shortenText(metrix.profitGain.toString() ?? "", 10)}%
            </StatListItemText>
          </StatListItem>
          <StatListItem>
            <StatListItemTitle>Initial Balalnce: </StatListItemTitle>
            <StatListItemText>
              {shortenText(
                tradeStats?.initialBalance.toLocaleString() ?? "",
                10
              )}
              $
            </StatListItemText>
          </StatListItem>
          <StatListItem>
            <StatListItemTitle>Balalnce: </StatListItemTitle>
            <StatListItemText title={metrix.balance.toLocaleString()}>
              {shortenText(metrix.balance.toLocaleString() ?? "", 10)}$
            </StatListItemText>
          </StatListItem>
        </StatList>
      </Sections>
      <Sections>
        <StatListHeader>Trades</StatListHeader>
        <StatList>
          <StatListItem>
            <StatListItemTitle>Profitability: </StatListItemTitle>
            <StatListItemText>{metrix?.winRate}%</StatListItemText>
          </StatListItem>
          <StatListItem>
            <StatListItemTitle>Total Trades: </StatListItemTitle>
            <StatListItemText>{metrix?.totalTrades}</StatListItemText>
          </StatListItem>
        </StatList>
      </Sections>
      {/* <ExpandedDataModal
        showModal={showExpandedData}
        setShowModal={setShowExpandedData}
      /> */}
      <AdvancedDataMetrix
        tradeStats={tradeStats}
        showModal={showExpandedData}
        setShowModal={setShowExpandedData}
      />
    </Container>
  );
};

export default DataTabContent;
