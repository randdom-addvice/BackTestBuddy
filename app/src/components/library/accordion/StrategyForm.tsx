import React from "react";
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
import InputPromptModal from "@/components/modal/InputPrompt/InputPromptModal";

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
  const createStrategyForm = useForm(
    isUpdateForm ? handleUpdateStrategy : handleCreateStrategy,
    {
      name: strategy?.name ?? "",
      startingBalance: isUpdateForm ? 1 : 0,
      description: strategy?.description ?? "",
    },
    {
      name: (value) => value.length > 0,
      startingBalance: (value) => value > 0,
      description: (value) => value.length > 0,
    }
  );
  const { description, name } = createStrategyForm.formValues;

  const { createStrategyMutation } = useCreateStrategyMutationHook(
    {
      createStrategyInput: {
        ...createStrategyForm.formValues,
        startingBalance: parseInt(
          String(createStrategyForm.formValues.startingBalance)
        ),
        library_id: libraryId,
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
      },
      {
        onCompleted: (completedData) => {
          if (completedData && completedData.updateStrategyDetails) {
            setShowModal(false);
          }
        },
        onError: (error) => {
          console.log(error);
          alert("Something went wrong, please retry");
        },
        refetchQueries: ["GetLibraries"],
      }
    );

  async function handleCreateStrategy() {
    try {
      await createStrategyMutation();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpdateStrategy() {
    try {
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
            <p>This field is requried</p>
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
              <p>This field is requried</p>
            )}
          </PromptInputGroup>
        )}

        <PromptInputGroup>
          <PromptTextArea
            name="description"
            defaultValue={strategy?.description}
            onChange={createStrategyForm.onChange}
            placeholder="Enter Strategy Description"
          />
          {createStrategyForm.getFieldError("description") && (
            <p>This field is requried</p>
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
