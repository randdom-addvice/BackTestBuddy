import {
  CreateStrategyMutationOptions,
  CreateStrategyMutationVariables,
  DeleteStrategyMutationOptions,
  DeleteStrategyMutationVariables,
  UpdateStrategyDetailsInput,
  UpdateStrategyDetailsMutationOptions,
  useCreateStrategyMutation,
  useDeleteStrategyMutation,
  useUpdateStrategyDetailsMutation,
} from "@/graphql/api";

export const useCreateStrategyMutationHook = (
  { createStrategyInput }: CreateStrategyMutationVariables,
  options?: CreateStrategyMutationOptions
) => {
  const [createStrategyMutation, { data, loading, error }] =
    useCreateStrategyMutation({
      variables: { createStrategyInput },
      ...options,
    });

  return { createStrategyMutation, data, loading, error };
};

export const useDeleteStrategyMutationHook = (
  { deleteStrategyId }: DeleteStrategyMutationVariables,
  options?: DeleteStrategyMutationOptions
) => {
  const [deleteStrategyMutation, { data, loading, error }] =
    useDeleteStrategyMutation({
      variables: { deleteStrategyId },
      ...options,
    });

  return { deleteStrategyMutation, data, loading, error };
};

export const useUpdateStrategyDetailsMutationHook = (
  args: UpdateStrategyDetailsInput,
  options?: UpdateStrategyDetailsMutationOptions
) => {
  const [updateStrategyDetailsMutation, { data, loading, error }] =
    useUpdateStrategyDetailsMutation({
      variables: { updateStrategyInput: { ...args } },
      ...options,
    });

  return { updateStrategyDetailsMutation, data, loading, error };
};
