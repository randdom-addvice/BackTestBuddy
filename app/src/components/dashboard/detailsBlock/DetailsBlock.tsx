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

const DetailsBlock = () => {
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
            <Balance>$ 10000</Balance>
            <BalanceText>Current Balance</BalanceText>
          </BalanceTextContainer>
        </ActionSection>
      </HeaderContainer>
      <InfoSection>
        <InfoBlock>
          <InfoLabel>Strategy Name</InfoLabel>
          <InfoText>ICT Silver Bullet</InfoText>
        </InfoBlock>
        <InfoBlock>
          <InfoLabel>Description</InfoLabel>
          <InfoText>Lorem ipsum dolor sit amet.</InfoText>
        </InfoBlock>
      </InfoSection>
      <Chart />
    </Container>
  );
};
/*
   <HeaderContainer>
      <Title>BackTest Section</Title>
      <BalanceAmount>$ 10000</BalanceAmount>
      <BalanceText>Current Balance</BalanceText>
      <ActionSection>
        <ActionSectionBackground />
        <ActionButton1>
          <div style={{ width: '37.50px', height: '21.88px', left: '0px', top: '5.83px', position: 'absolute', border: '0.75px black solid' }} />
          <div style={{ width: '12.03px', height: '8.75px', left: '12.73px', top: '14.22px', position: 'absolute', border: '0.75px black solid' }} />
        </ActionButton1>
        <ActionButton2>
          <div style={{ width: '113px', height: '44px', left: '0px', top: '-3px', position: 'absolute', background: '#E4E4E4', borderRadius: '20px' }} />
          <DollarSign>$</DollarSign>
          <CircleButton />
        </ActionButton2>
      </ActionSection>
    </HeaderContainer>

 */
export default DetailsBlock;
