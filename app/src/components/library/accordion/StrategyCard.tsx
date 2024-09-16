import React, { useState } from "react";
import {
  CardContainer,
  DeleteButton,
  DescriptionText,
  EditButton,
  StatisticsList,
  StatisticsListItem,
  Title,
  ViewExpanded,
  ViewLink,
} from "./elements";
import { FaEdit, FaExpand, FaTrash } from "react-icons/fa";
import { removeHTMLTags, shortenText } from "@/utils/text";
import { StyledFlex } from "@/styles/globalElements";
import { AppRoutes } from "@/routes/routesDeclaration";
import { StrategyCardType } from "../common";
import { useDeleteStrategyMutationHook } from "@/graphql/mutations/strategy/strategy.mutations";
import InputPromptModal from "@/components/modal/InfoModal/InfoModal";
import StrategyForm from "./StrategyForm";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import RichTextPreviewModal from "@/components/global/editor/RichTextPreviewModal";

interface Props {
  strategy: StrategyCardType;
}

const StrategyCard: React.FC<Props> = ({ strategy }) => {
  const [showRichTextPreviewModal, setShowRichTextPreviewModal] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [modalButtonLoadingState, setModalButtonLoadingState] = useState(false);
  const { deleteStrategyMutation } = useDeleteStrategyMutationHook(
    {
      deleteStrategyId: strategy.id,
      library_id: strategy.libraryId,
    },
    {
      onCompleted: (completedData) => {
        setModalButtonLoadingState(false);
        if (completedData && completedData.deleteStrategy) {
          setShowModal(false);
        }
      },
      // refetchQueries: ["GetLibraries"],
    }
  );

  async function deleteStrategy() {
    try {
      setModalButtonLoadingState(true);
      await deleteStrategyMutation();
    } catch (error) {
      alert("something went wrong");
    }
  }

  function viewExpanded() {
    setShowRichTextPreviewModal(true);
  }

  return (
    <>
      <CardContainer>
        <StyledFlex justify="flex-end" align="center">
          <DeleteButton onClick={() => setShowModal(true)}>
            <FaTrash />
          </DeleteButton>
          <EditButton onClick={() => setShowUpdateModal(true)}>
            <FaEdit />
          </EditButton>
        </StyledFlex>
        <Title title={strategy.name}>{shortenText(strategy.name, 25)}</Title>
        <DescriptionText>
          <span title={removeHTMLTags(strategy.description)}>
            {shortenText(removeHTMLTags(strategy.description), 100)}{" "}
          </span>
          <ViewExpanded onClick={viewExpanded}>view expanded</ViewExpanded>
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
        <ViewLink
          href={`${AppRoutes.METRIX_DYNAMIC}${strategy.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Metrix
        </ViewLink>
      </CardContainer>
      <InputPromptModal
        headerTitle="Delete Strategy"
        onSubmit={deleteStrategy}
        showModal={showModal}
        setShowModal={setShowModal}
        isLoading={modalButtonLoadingState}
      >
        <p>
          Are you sure you want to delete <strong>{strategy.name}</strong>?
        </p>
      </InputPromptModal>
      <StrategyForm
        showModal={showUpdateModal}
        setShowModal={setShowUpdateModal}
        libraryId={strategy.libraryId}
        isUpdateForm={true}
        strategy={strategy}
      />
      <RichTextPreviewModal
        showRichTextPreviewModal={showRichTextPreviewModal}
        setShowRichTextPreviewModal={setShowRichTextPreviewModal}
        richText={strategy.description}
      />
    </>
  );
};

export default StrategyCard;
