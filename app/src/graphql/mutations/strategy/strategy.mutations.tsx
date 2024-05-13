import {
  CreateStrategyMutationOptions,
  CreateStrategyMutationVariables,
  DeleteStrategyMutationOptions,
  DeleteStrategyMutationVariables,
  ResetStrategyStatsMutationOptions,
  ResetStrategyStatsMutationVariables,
  UndoLastStrategyStatsMutationOptions,
  UndoLastStrategyStatsMutationVariables,
  UpdateStrategyDetailsInput,
  UpdateStrategyDetailsMutationOptions,
  UpdateStrategyStatsMutationOptions,
  UpdateStrategyStatsMutationVariables,
  useCreateStrategyMutation,
  useDeleteStrategyMutation,
  useResetStrategyStatsMutation,
  useUndoLastStrategyStatsMutation,
  useUpdateStrategyDetailsMutation,
  useUpdateStrategyStatsMutation,
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

export const useUpdateStrategyStatsMutationHook = (
  args: UpdateStrategyStatsMutationVariables,
  options?: UpdateStrategyStatsMutationOptions
) => {
  const [updateStrategyStatsMutation, { data, loading, error }] =
    useUpdateStrategyStatsMutation({
      variables: args,
      ...options,
    });

  return { updateStrategyStatsMutation, data, loading, error };
};

export const useUndoLastStrategyStatsMutationHook = (
  args: UndoLastStrategyStatsMutationVariables,
  options?: UndoLastStrategyStatsMutationOptions
) => {
  const [undoLastStrategyStatsMutation, { data, loading, error }] =
    useUndoLastStrategyStatsMutation({
      variables: args,
      ...options,
    });

  return { undoLastStrategyStatsMutation, data, loading, error };
};

export const useResetStrategyStatsMutationHook = (
  args: ResetStrategyStatsMutationVariables,
  options?: ResetStrategyStatsMutationOptions
) => {
  const [resetStrategyStatsMutation, { data, loading, error }] =
    useResetStrategyStatsMutation({
      variables: args,
      ...options,
    });

  return { resetStrategyStatsMutation, data, loading, error };
};
