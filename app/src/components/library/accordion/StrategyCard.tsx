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

const StrategyCard = () => {
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
      <Title title="here">
        {shortenText("JANUARY EURUSD M5 (HTF CONFIRMATION on 30M chart)", 25)}
      </Title>
      <DescriptionText title="here">
        {shortenText(
          "  LONDON SESSION, Start=JAN(1 month); Risk=1% 1:2 rr Tenkan sen+Kijun sen confirmations must be checked on 30M",
          100
        )}
      </DescriptionText>
      <hr />
      <StatisticsList>
        <StatisticsListItem>
          <strong>Trades:</strong> <span>33</span>
        </StatisticsListItem>
        <StatisticsListItem>
          <strong>Win rate:</strong> <span>61%</span>
        </StatisticsListItem>
        <StatisticsListItem>
          <strong>Profit Gain:</strong> <span>27.00%</span>
        </StatisticsListItem>
      </StatisticsList>
      <ViewLink to={`${AppRoutes.METRIX_DYNAMIC}6593086205ac6203b3799711`}>
        View Metrix
      </ViewLink>
    </CardContainer>
  );
};

export default StrategyCard;
