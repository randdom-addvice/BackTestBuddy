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

const DataTabContent = () => {
  const [showExpandedData, setShowExpandedData] = useState(false);
  const { tradeStats } =
    useAppSelector((state) => state.strategy.selectedStrategyMetrix) || {};
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
            <StatListItemText title={tradeStats?.profitGain.toFixed(2)}>
              {shortenText(tradeStats?.profitGain.toFixed(2) ?? "", 10)}%
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
            <StatListItemText>
              {shortenText(tradeStats?.balance.toLocaleString() ?? "", 10)}$
            </StatListItemText>
          </StatListItem>
        </StatList>
      </Sections>
      <Sections>
        <StatListHeader>Trades</StatListHeader>
        <StatList>
          <StatListItem>
            <StatListItemTitle>Profitability: </StatListItemTitle>
            <StatListItemText>{tradeStats?.percentageWin}%</StatListItemText>
          </StatListItem>
          <StatListItem>
            <StatListItemTitle>Total Trades: </StatListItemTitle>
            <StatListItemText>{tradeStats?.totalTrades}</StatListItemText>
          </StatListItem>
        </StatList>
      </Sections>
      {/* <ExpandedDataModal
        showModal={showExpandedData}
        setShowModal={setShowExpandedData}
      /> */}
      <AdvancedDataMetrix
        showModal={showExpandedData}
        setShowModal={setShowExpandedData}
      />
    </Container>
  );
};

export default DataTabContent;
