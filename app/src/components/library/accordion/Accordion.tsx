import React, { useRef, useState } from "react";
import {
  AccordionContainer,
  AccordionContent,
  AccordionContentGrid,
  AccordionDetails,
  AccordionInput,
  AccordionSummary,
  DeleteButton,
  Description,
  EditButton,
} from "./elements";
import StrategyCard from "./StrategyCard";
import { GetLibrariesQuery, Library, Strategy } from "@/graphql/api";
import { StrategyCardType } from "../common";
import { StyledFlex } from "@/styles/globalElements";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useDeleteLibraryMutationHook,
  useModifyLibraryMutationHook,
} from "@/graphql/mutations/library/library.mutations";
import { useForm } from "@/hooks/useForm";
import { shortenText } from "@/utils/text";
import InputPromptModal from "@/components/modal/InputPrompt/InputPromptModal";
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
  const { onChange, formValues } = useForm(() => {}, { name: library.name });
  const { updateLibrary, error, data } = useModifyLibraryMutationHook({
    modifyLibraryInput: { name: formValues.name, library_id: library.id },
  });
  const { deleteLibrary } = useDeleteLibraryMutationHook(
    { deleteLibraryId: library.id },
    {
      onError: (error) => {
        console.log(error);
        alert("Something went wrong, please retry");
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
      await deleteLibrary();
    } catch (error) {
      console.log(error);
    }
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
              <DeleteButton onClick={handleDeleteLibrary}>
                <FaTrash />
              </DeleteButton>
              <EditButton onClick={handleEditButtonClick}>
                <FaEdit />
              </EditButton>
            </StyledFlex>
          </StyledFlex>
        </AccordionSummary>
        <AccordionContent>
          <Description title={library.description}>
            Library Description:{" "}
            <span>{shortenText(library.description, 300)}</span>
          </Description>
          <AccordionContentGrid>
            {strategies.map((strat) => (
              <StrategyCard key={strat.id} strategy={strat} />
            ))}
          </AccordionContentGrid>
        </AccordionContent>
      </AccordionDetails>
    </>
  );
};

export default Accordion;
