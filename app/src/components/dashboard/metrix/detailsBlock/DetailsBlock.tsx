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
import { useAppSelector } from "@/redux/hooks";
import { shortenText } from "@/utils/text";
import GrowthChart from "./chart/GrowthChart";
import AnalyticsCharts from "./chart/analyticsChart/AnalyticsCharts";

const DetailsBlock = () => {
  const metrix = useAppSelector(
    (state) => state.strategy.selectedStrategyMetrix
  );
  return (
    <Container>
      <div className="wrapper">
        <HeaderContainer>
          <Title>BackTest Section</Title>
          <ActionSection>
            <Switch />
            <SaveButton>
              <IoCloudDoneOutline size="25px" />
            </SaveButton>
            <BalanceTextContainer>
              <Balance>
                $ {metrix?.tradeStats.balance.toLocaleString() ?? 0}
              </Balance>
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
      <GrowthChart />
      <AnalyticsCharts />
      {/* <GrowthChart /> */}
      {/* <Chart /> */}
    </Container>
  );
};
export default DetailsBlock;
