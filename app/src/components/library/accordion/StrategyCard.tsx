import React from "react";
import {
  CardContainer,
  DeleteButton,
  DescriptionText,
  EditButton,
  StatisticsList,
  StatisticsListItem,
  Title,
  ViewLink,
} from "./elements";
import { FaEdit, FaTrash } from "react-icons/fa";
import { shortenText } from "@/utils/text";
import { StyledFlex } from "@/styles/globalElements";
import { AppRoutes } from "@/routes/routesDeclaration";
import { StrategyCardType } from "../common";

interface Props {
  strategy: StrategyCardType;
}

const StrategyCard: React.FC<Props> = ({ strategy }) => {
  return (
    <CardContainer>
      <StyledFlex justify="flex-end" align="center">
        <DeleteButton>
          <FaTrash />
        </DeleteButton>
        <EditButton>
          <FaEdit />
        </EditButton>
      </StyledFlex>
      <Title title={strategy.name}>{shortenText(strategy.name, 25)}</Title>
      <DescriptionText title={strategy.description}>
        {shortenText(strategy.description, 100)}
      </DescriptionText>
      <hr />
      <StatisticsList>
        <StatisticsListItem>
          <strong>Trades:</strong>
          <span>{strategy.totalTrades}</span>
        </StatisticsListItem>
        <StatisticsListItem>
          <strong>Win rate:</strong>
          <span>{strategy.percentageWin}%</span>
        </StatisticsListItem>
        <StatisticsListItem>
          <strong>Profit Gain:</strong>
          <span>{strategy.profitGain}%</span>
        </StatisticsListItem>
      </StatisticsList>
      <ViewLink to={`${AppRoutes.METRIX_DYNAMIC}${strategy.id}`}>
        View Metrix
      </ViewLink>
    </CardContainer>
  );
};

export default StrategyCard;
