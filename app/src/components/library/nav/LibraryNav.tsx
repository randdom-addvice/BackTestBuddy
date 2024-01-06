import React, { useState } from "react";
import {
  Container,
  Header,
  HeaderWrapper,
  StyledButton,
  StyledButtonWrapper,
} from "./elements";
import InputPromptModal from "@/components/modal/InfoModal/InfoModal";
import { PromptInput, PromptInputGroup, PromptTextArea } from "../common";
import { useForm } from "@/hooks/useForm";
import { useCreateLibraryMutationHook } from "@/graphql/mutations/library/library.mutations";

const LibraryNav = () => {
  const [showModal, setShowModal] = useState(false);
  const { onChange, formValues, getFieldError, handleNonFormSubmit } = useForm(
    handleSubmit,
    {
      name: "",
      description: "",
    },
    {
      name: (value: string) => value.length > 0,
      description: (value: string) => value.length > 0,
    }
  );
  const { createLibrary, error, data, loading } = useCreateLibraryMutationHook(
    {
      createLibraryInput: {
        name: formValues.name,
        description: formValues.description,
      },
    },
    {
      onCompleted: (completedData) => {
        if (completedData && completedData.createLibrary) {
          setShowModal(false);
        }
        console.log(completedData, "completedData");
      },
      onError: (error) => {
        console.log(error);
        alert("Something went wrong, please retry");
      },
      refetchQueries: ["GetLibraries"],
    }
  );

  async function handleSubmit() {
    try {
      await createLibrary();
      console.log(data, "data");
      console.log(error, "error");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <StyledButtonWrapper>
        <StyledButton onClick={() => setShowModal(true)}>
          Create Library
        </StyledButton>
      </StyledButtonWrapper>
      <HeaderWrapper>
        <Header>Your Libraries</Header>
      </HeaderWrapper>
      <InputPromptModal
        onSubmit={handleNonFormSubmit}
        showModal={showModal}
        setShowModal={setShowModal}
        headerTitle="Create New Library"
      >
        <>
          <PromptInputGroup>
            <PromptInput
              name="name"
              placeholder="Enter Library Name"
              onChange={onChange}
            />
            {getFieldError("name") && <p>This field is requried</p>}
          </PromptInputGroup>
          <PromptInputGroup>
            <PromptTextArea
              name="description"
              onChange={onChange}
              placeholder="Enter Library Description"
            />
            {getFieldError("description") && <p>This field is requried</p>}
          </PromptInputGroup>
          {loading && (
            <PromptInputGroup>
              <p className="loading">Loading please wait...</p>
            </PromptInputGroup>
          )}
        </>
      </InputPromptModal>
    </Container>
  );
};

export default LibraryNav;
