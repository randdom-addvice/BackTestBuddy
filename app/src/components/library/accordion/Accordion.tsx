import React, { useRef } from "react";
import styled from "styled-components";
import {
  AccordionContainer,
  AccordionContent,
  AccordionContentGrid,
  AccordionDetails,
  AccordionInput,
  AccordionSummary,
  DeleteButton,
  EditButton,
} from "./elements";
import StrategyCard from "./StrategyCard";
import { GetLibrariesQuery, Library, Strategy } from "@/graphql/api";
import { StrategyCardType } from "../common";
import { StyledFlex } from "@/styles/globalElements";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useModifyLibraryMutationHook } from "@/graphql/mutations/library/library.mutations";
import { useForm } from "@/hooks/useForm";
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

  function handleEditButtonClick() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  async function handleBlur() {
    console.log("Input lost focus");
    await updateLibrary();
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
              <DeleteButton>
                <FaTrash />
              </DeleteButton>
              <EditButton onClick={handleEditButtonClick}>
                <FaEdit />
              </EditButton>
            </StyledFlex>
          </StyledFlex>
        </AccordionSummary>
        <AccordionContent>
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
