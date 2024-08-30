import React, { useEffect, useState } from "react";
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
import RichText from "@/components/global/editor/RichText";

const LibraryNav = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalButtonLoadingState, setModalButtonLoadingState] = useState(false);
  const [description, setDescription] = useState("");
  const {
    onChange,
    formValues,
    getFieldError,
    handleNonFormSubmit,
    setFormValue,
  } = useForm(
    handleSubmit,
    {
      name: "",
      description, //: description ?? "",
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
        description, //: formValues.description,
      },
    },
    {
      onCompleted: (completedData) => {
        setModalButtonLoadingState(false);
        if (completedData && completedData.createLibrary) {
          setShowModal(false);
          setDescription("");
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

  useEffect(() => {
    setFormValue("description", description);
  }, [description]);

  async function handleSubmit() {
    try {
      setModalButtonLoadingState(true);
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
        onSubmit={() => {
          // setFormValue("description", description);
          handleNonFormSubmit();
        }}
        showModal={showModal}
        setShowModal={setShowModal}
        headerTitle="Create New Library"
        isLoading={modalButtonLoadingState}
      >
        <>
          <PromptInputGroup>
            <PromptInput
              name="name"
              placeholder="Enter Library Name"
              onChange={onChange}
            />
            {getFieldError("name") && (
              <p className="errorMsg">This field is requried</p>
            )}
          </PromptInputGroup>
          <PromptInputGroup>
            <RichText setText={setDescription} text={description} />
            {/* <PromptTextArea
              name="description"
              onChange={onChange}
              placeholder="Enter Library Description"
            />
            */}
            {getFieldError("description") && (
              <p className="errorMsg">This field is requried</p>
            )}
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
