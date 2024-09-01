import React, { useEffect, useState } from "react";
import {
  PromptInput,
  PromptInputGroup,
  PromptTextArea,
  StrategyCardType,
} from "../common";
import { useForm } from "@/hooks/useForm";
import {
  useCreateStrategyMutationHook,
  useUpdateStrategyDetailsMutationHook,
} from "@/graphql/mutations/strategy/strategy.mutations";
import InputPromptModal from "@/components/modal/InfoModal/InfoModal";
import RichText from "@/components/global/editor/RichText";

interface Props {
  libraryId: string;
  showModal: boolean;
  setShowModal: (
    state: boolean
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateForm: boolean;
  //   onSubmit: () => void;
  strategy?: StrategyCardType;
}

const StrategyForm: React.FC<Props> = ({
  libraryId,
  setShowModal,
  showModal,
  isUpdateForm,
  strategy,
}) => {
  const [modalButtonLoadingState, setModalButtonLoadingState] = useState(false);
  const [description, setDescription] = useState(strategy?.description ?? "");
  const createStrategyForm = useForm(
    isUpdateForm ? handleUpdateStrategy : handleCreateStrategy,
    {
      name: strategy?.name ?? "",
      startingBalance: isUpdateForm ? 1 : 0,
      description, //: description ?? " ",
    },
    {
      name: (value) => value.length > 0,
      startingBalance: (value) => value > 0,
      description: (value) => value.length > 0,
    }
  );

  const { setFormValue } = createStrategyForm;
  const { name } = createStrategyForm.formValues;

  const { createStrategyMutation } = useCreateStrategyMutationHook(
    {
      createStrategyInput: {
        ...{
          ...createStrategyForm.formValues,
          description,
        },
        startingBalance: parseInt(
          String(createStrategyForm.formValues.startingBalance)
        ),
        library_id: libraryId,
      },
    },
    {
      onCompleted: (completedData) => {
        setModalButtonLoadingState(false);
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
  const { updateStrategyDetailsMutation } =
    useUpdateStrategyDetailsMutationHook(
      {
        description,
        name,
        strategy_id: strategy?.id ?? "",
        library_id: libraryId,
      },
      {
        onCompleted: (completedData) => {
          setModalButtonLoadingState(false);
          if (completedData && completedData.updateStrategyDetails) {
            setShowModal(false);
          }
        },
        onError: (error) => {
          alert("Something went wrong, please retry");
          console.log(error);
          setModalButtonLoadingState(false);
        },
        // refetchQueries: ["GetLibraries"],
      }
    );

  useEffect(() => {
    setFormValue("description", description);
  }, [description]);

  async function handleCreateStrategy() {
    try {
      setModalButtonLoadingState(true);
      await createStrategyMutation();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpdateStrategy() {
    try {
      setModalButtonLoadingState(true);
      await updateStrategyDetailsMutation();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <InputPromptModal
        headerTitle={isUpdateForm ? "Update Strategy" : "Add new strategy"}
        onSubmit={createStrategyForm.handleNonFormSubmit}
        showModal={showModal}
        setShowModal={setShowModal}
        isLoading={modalButtonLoadingState}
      >
        <PromptInputGroup>
          <PromptInput
            name="name"
            type="text"
            placeholder="Enter Strategy Name"
            defaultValue={strategy?.name}
            onChange={createStrategyForm.onChange}
          />
          {createStrategyForm.getFieldError("name") && (
            <p className="errorMsg">This field is requried</p>
          )}
        </PromptInputGroup>
        {!isUpdateForm && (
          <PromptInputGroup>
            <PromptInput
              min={10}
              max={10000000}
              name="startingBalance"
              type="number"
              placeholder="Enter starting balance"
              onChange={createStrategyForm.onChange}
            />
            {createStrategyForm.getFieldError("startingBalance") && (
              <p className="errorMsg">This field is requried</p>
            )}
          </PromptInputGroup>
        )}

        <PromptInputGroup>
          {/* <PromptTextArea
            name="description"
            defaultValue={strategy?.description}
            onChange={createStrategyForm.onChange}
            placeholder="Enter Strategy Description"
          /> */}

          <RichText setText={setDescription} text={description} />
          {createStrategyForm.getFieldError("description") && (
            <p className="errorMsg">This field is required</p>
          )}
        </PromptInputGroup>
        {/* {loading && (
            <PromptInputGroup>
              <p className="loading">Loading please wait...</p>
            </PromptInputGroup>
          )} */}
      </InputPromptModal>
    </>
  );
};

export default StrategyForm;
