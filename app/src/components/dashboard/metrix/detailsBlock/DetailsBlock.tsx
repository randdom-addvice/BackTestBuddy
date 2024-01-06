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
  Title,
} from "./elements";
import Switch from "./Switch";
import Chart from "./chart/Chart";
import { useAppSelector } from "@/redux/hooks";
import { shortenText } from "@/utils/text";

const DetailsBlock = () => {
  const metrix = useAppSelector(
    (state) => state.strategy.selectedStrategyMetrix
  );
  return (
    <Container>
      <HeaderContainer>
        <Title>BackTest Section</Title>
        <ActionSection>
          <Switch />
          <SaveButton>
            <IoCloudDoneOutline size="25px" />
          </SaveButton>
          <BalanceTextContainer>
            <Balance>$ {metrix?.tradeStats.balance ?? 0}</Balance>
            <BalanceText>Current Balance</BalanceText>
          </BalanceTextContainer>
        </ActionSection>
      </HeaderContainer>
      <InfoSection>
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
      </InfoSection>
      <Chart />
    </Container>
  );
};
export default DetailsBlock;
