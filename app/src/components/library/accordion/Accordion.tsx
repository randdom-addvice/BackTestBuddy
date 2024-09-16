import React, { useMemo, useRef, useState } from "react";
import {
  AccordionContainer,
  AccordionContent,
  AccordionContentGrid,
  AccordionDetails,
  AccordionName,
  AccordionSummary,
  AnalyticsList,
  CreateStratBtn,
  DeleteButton,
  Description,
  EditButton,
  QuarterAnalyticsList,
} from "./elements";
import StrategyCard from "./StrategyCard";
import { GetLibrariesQuery, Library, Strategy } from "@/graphql/api";
import {
  PromptInput,
  PromptInputGroup,
  PromptTextArea,
  StrategyCardType,
} from "../common";
import { StyledFlex } from "@/styles/globalElements";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useDeleteLibraryMutationHook,
  useModifyLibraryMutationHook,
} from "@/graphql/mutations/library/library.mutations";
import { useForm } from "@/hooks/useForm";
import { removeHTMLTags, shortenText } from "@/utils/text";
import InputPromptModal from "@/components/modal/InfoModal/InfoModal";
import { useCreateStrategyMutationHook } from "@/graphql/mutations/strategy/strategy.mutations";
import StrategyForm from "./StrategyForm";
import RichTextPreviewModal from "@/components/global/editor/RichTextPreviewModal";
import LibraryForm from "../LibraryForm";
import InfoModal from "@/components/modal/InfoModal/InfoModal";
import MetricsModal from "./MetricsModal";
interface Props {
  library: {
    name: string;
    description: string;
    id: string;
  };
  strategies: StrategyCardType[];
}

const Accordion: React.FC<Props> = ({ library, strategies }) => {
  const [showModal, setShowModal] = useState(false);
  const [showMetricsModal, setShowMetricsModal] = useState(false);
  const [showUpdateLibraryModal, setShowUpdateLibraryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalButtonLoadingState, setModalButtonLoadingState] = useState(false);
  const [showRichTextPreviewModal, setShowRichTextPreviewModal] =
    useState(false);

  const createStrategyForm = useForm(
    handleCreateStrategy,
    {
      name: "",
      startingBalance: 0,
      description: "",
    },
    {
      name: (value) => value.length > 0,
      startingBalance: (value) => value > 1,
      description: (value) => value.length > 0,
    }
  );
  const { onChange, formValues } = useForm(() => {}, { name: library.name });
  const { deleteLibrary } = useDeleteLibraryMutationHook(
    { deleteLibraryId: library.id },
    {
      onError: (error) => {
        alert("Something went wrong, please retry");
        setModalButtonLoadingState(false);
      },
      onCompleted: (completedData) => {
        setModalButtonLoadingState(false);
        if (completedData && completedData.deleteLibrary) {
          setShowDeleteModal(false);
        }
      },
      refetchQueries: ["GetLibraries"],
    }
  );
  const { createStrategyMutation } = useCreateStrategyMutationHook(
    {
      createStrategyInput: {
        ...createStrategyForm.formValues,
        startingBalance: parseInt(
          String(createStrategyForm.formValues.startingBalance)
        ),
        library_id: library.id,
      },
    },
    {
      onCompleted: (completedData) => {
        if (completedData && completedData.createStrategy) {
          setShowModal(false);
        }
      },
      onError: (error) => {
        alert("Something went wrong, please retry");
        setModalButtonLoadingState(false);
      },
      refetchQueries: ["GetLibraries"],
    }
  );

  function handleEditButtonClick() {
    setShowUpdateLibraryModal(true);
  }

  async function handleBlur() {
    if (formValues.name === library.name) return;
  }

  async function handleDeleteLibrary() {
    try {
      setModalButtonLoadingState(true);
      await deleteLibrary();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreateStrategy() {
    try {
      // setModalButtonLoadingState(true)
      await createStrategyMutation();
    } catch (error) {
      console.log(error);
    }
  }

  function viewExpanded() {
    setShowRichTextPreviewModal(true);
  }

  return (
    <>
      <AccordionDetails>
        <AccordionSummary>
          <StyledFlex>
            <AccordionName>{formValues.name}</AccordionName>
            <StyledFlex justify="flex-end" align="center" width="fit-content">
              <DeleteButton
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              >
                <FaTrash />
              </DeleteButton>
              <EditButton onClick={handleEditButtonClick}>
                <FaEdit />
              </EditButton>
            </StyledFlex>
          </StyledFlex>
        </AccordionSummary>
        <AccordionContent>
          <CreateStratBtn onClick={() => setShowModal(true)}>
            Create Strategy
          </CreateStratBtn>
          <Description>
            Library Description:{" "}
            {/* <span>{shortenText(library.description, 300)}</span>{" "} */}
            <span title={removeHTMLTags(library.description)}>
              {shortenText(removeHTMLTags(library.description), 300)}{" "}
            </span>
            <button onClick={viewExpanded}>view expanded</button>
            <br />
            <button
              onClick={() => {
                setShowMetricsModal(true);
              }}
            >
              view analytics
            </button>
          </Description>
          <AccordionContentGrid>
            {strategies.map((strat) => (
              <StrategyCard key={strat.id} strategy={strat} />
            ))}
          </AccordionContentGrid>
        </AccordionContent>
      </AccordionDetails>
      <InputPromptModal
        headerTitle="Delete Library"
        onSubmit={handleDeleteLibrary}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        isLoading={modalButtonLoadingState}
      >
        <p>
          Are you sure you want to delete <strong>{library.name}</strong>?
        </p>
      </InputPromptModal>
      <StrategyForm
        showModal={showModal}
        setShowModal={setShowModal}
        libraryId={library.id}
        isUpdateForm={false}
      />
      <LibraryForm
        showModal={showUpdateLibraryModal}
        setShowModal={setShowUpdateLibraryModal}
        isUpdateForm={true}
        library={library}
      />
      <RichTextPreviewModal
        showRichTextPreviewModal={showRichTextPreviewModal}
        setShowRichTextPreviewModal={setShowRichTextPreviewModal}
        richText={library.description}
      />
      <MetricsModal
        showMetricsModal={showMetricsModal}
        setShowMetricsModal={setShowMetricsModal}
        library={library}
        strategies={strategies}
      />
    </>
  );
};

export default Accordion;
