import React, { useRef, useState } from "react";
import {
  AccordionContainer,
  AccordionContent,
  AccordionContentGrid,
  AccordionDetails,
  AccordionInput,
  AccordionSummary,
  CreateStratBtn,
  DeleteButton,
  Description,
  EditButton,
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
import { shortenText } from "@/utils/text";
import InputPromptModal from "@/components/modal/InfoModal/InfoModal";
import { useCreateStrategyMutationHook } from "@/graphql/mutations/strategy/strategy.mutations";
import StrategyForm from "./StrategyForm";
import RichTextPreviewModal from "@/components/global/editor/RichTextPreviewModal";
interface Props {
  library: {
    name: string;
    description: string;
    id: string;
  };
  strategies: StrategyCardType[];
}

const Accordion: React.FC<Props> = ({ library, strategies }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showModal, setShowModal] = useState(false);
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
  const { updateLibrary } = useModifyLibraryMutationHook({
    modifyLibraryInput: { name: formValues.name, library_id: library.id },
  });
  const { deleteLibrary } = useDeleteLibraryMutationHook(
    { deleteLibraryId: library.id },
    {
      onError: (error) => {
        console.log(error);
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
        console.log(error);
        alert("Something went wrong, please retry");
        setModalButtonLoadingState(false);
      },
      refetchQueries: ["GetLibraries"],
    }
  );

  function handleEditButtonClick() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  async function handleBlur() {
    if (formValues.name === library.name) return;
    await updateLibrary();
  }

  async function handleDeleteLibrary() {
    try {
      setModalButtonLoadingState(true);
      await deleteLibrary();
    } catch (error) {
      console.log(error);
    }
  }
  console.log(createStrategyForm.formValues);

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
            <AccordionInput
              ref={inputRef}
              onBlur={handleBlur}
              name="name"
              type="text"
              value={formValues.name}
              onChange={onChange}
            />
            <StyledFlex justify="flex-end" align="center">
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
          <Description title={library.description}>
            Library Description:{" "}
            <span>{shortenText(library.description, 300)}</span>{" "}
            <button onClick={viewExpanded}>view expanded</button>
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
      <RichTextPreviewModal
        showRichTextPreviewModal={showRichTextPreviewModal}
        setShowRichTextPreviewModal={setShowRichTextPreviewModal}
        richText={library.description}
      />
    </>
  );
};

export default Accordion;
