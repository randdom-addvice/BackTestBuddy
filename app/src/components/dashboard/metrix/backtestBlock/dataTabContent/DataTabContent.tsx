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
            <StatListItemText>{tradeStats?.profitGain}%</StatListItemText>
          </StatListItem>
          <StatListItem>
            <StatListItemTitle>Balalnce: </StatListItemTitle>
            {/* <StatListItemText>{tradeStats?.}</StatListItemText> */}
          </StatListItem>
        </StatList>
      </Sections>
      <Sections>
        <StatListHeader>Trades</StatListHeader>
        <StatList>
          <StatListItem>
            <StatListItemTitle>Profitability: </StatListItemTitle>
            <StatListItemText>50%</StatListItemText>
          </StatListItem>
          <StatListItem>
            <StatListItemTitle>Total Trades: </StatListItemTitle>
            <StatListItemText>20</StatListItemText>
          </StatListItem>
        </StatList>
      </Sections>
      <ExpandedDataModal
        showModal={showExpandedData}
        setShowModal={setShowExpandedData}
      />
    </Container>
  );
};

export default DataTabContent;
