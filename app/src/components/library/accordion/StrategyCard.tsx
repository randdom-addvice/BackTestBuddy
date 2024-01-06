import React, { useState } from "react";
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
import { useDeleteStrategyMutationHook } from "@/graphql/mutations/strategy/strategy.mutations";
import InputPromptModal from "@/components/modal/InputPrompt/InputPromptModal";

interface Props {
  strategy: StrategyCardType;
}

const StrategyCard: React.FC<Props> = ({ strategy }) => {
  const [showModal, setShowModal] = useState(false);
  const { deleteStrategyMutation } = useDeleteStrategyMutationHook(
    {
      deleteStrategyId: strategy.id,
    },
    {
      onCompleted: (completedData) => {
        if (completedData && completedData.deleteStrategy) {
          setShowModal(false);
        }
      },
      refetchQueries: ["GetLibraries"],
    }
  );

  async function deleteStrategy() {
    try {
      await deleteStrategyMutation();
    } catch (error) {
      alert("something went wrong");
    }
  }

  return (
    <>
      <CardContainer>
        <StyledFlex justify="flex-end" align="center">
          <DeleteButton onClick={() => setShowModal(true)}>
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
      <InputPromptModal
        headerTitle="Delete Strategy"
        onSubmit={deleteStrategy}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <p>
          Are you sure you want to delete <strong>{strategy.name}</strong>?
        </p>
      </InputPromptModal>
    </>
  );
};

export default StrategyCard;
