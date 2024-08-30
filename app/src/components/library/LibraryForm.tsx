import React, { useEffect, useState } from "react";
import RichText from "@/components/global/editor/RichText";
import InputPromptModal from "@/components/modal/InfoModal/InfoModal";
import { PromptInput, PromptInputGroup, PromptTextArea } from "./common";
import { useForm } from "@/hooks/useForm";
import {
  useCreateLibraryMutationHook,
  useModifyLibraryMutationHook,
} from "@/graphql/mutations/library/library.mutations";
import { Library } from "@/graphql/api";

interface Props {
  showModal: boolean;
  setShowModal: (
    state: boolean
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateForm: boolean;
  library?: {
    name: string;
    description: string;
    id: string;
  };
}

const LibraryForm: React.FC<Props> = ({
  showModal,
  setShowModal,
  isUpdateForm,
  library,
}) => {
  const [modalButtonLoadingState, setModalButtonLoadingState] = useState(false);
  const [description, setDescription] = useState(library?.description ?? "");
  const {
    onChange,
    formValues,
    getFieldError,
    handleNonFormSubmit,
    setFormValue,
  } = useForm(
    handleSubmit,
    {
      name: library?.name ?? "",
      description, // description ?? "",
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
        alert("Something went wrong, please retry");
        setModalButtonLoadingState(false);
      },
      refetchQueries: ["GetLibraries"],
    }
  );

  const { updateLibrary } = useModifyLibraryMutationHook(
    {
      modifyLibraryInput: {
        name: formValues.name,
        library_id: library?.id ?? "",
        description,
      },
    },
    {
      onCompleted: (completedData) => {
        setModalButtonLoadingState(false);
        if (completedData && completedData.modifyLibrary) {
          setShowModal(false);
          setDescription("");
        }
      },
      onError: (error) => {
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
    if (isUpdateForm) {
      handleUpdateLibrary();
    } else {
      handleCreateLibrary();
    }
  }

  async function handleCreateLibrary() {
    try {
      setModalButtonLoadingState(true);
      await createLibrary();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateLibrary() {
    try {
      setModalButtonLoadingState(true);
      await updateLibrary();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <InputPromptModal
      onSubmit={() => {
        // setFormValue("description", description);
        handleNonFormSubmit();
      }}
      showModal={showModal}
      setShowModal={setShowModal}
      headerTitle={isUpdateForm ? "Update Library" : "Create New Library"}
      isLoading={modalButtonLoadingState}
    >
      <>
        <PromptInputGroup>
          <PromptInput
            name="name"
            placeholder="Enter Library Name"
            onChange={onChange}
            defaultValue={library?.name}
          />
          {getFieldError("name") && (
            <p className="errorMsg">This field is requried</p>
          )}
        </PromptInputGroup>
        <PromptInputGroup>
          <RichText setText={setDescription} text={description} />
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
  );
};

export default LibraryForm;
