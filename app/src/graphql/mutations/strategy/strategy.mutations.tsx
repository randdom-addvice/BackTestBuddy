import {
  CreateStrategyMutationOptions,
  CreateStrategyMutationVariables,
  DeleteStrategyMutationOptions,
  DeleteStrategyMutationVariables,
  GetLibrariesQuery,
  Library,
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
  useGetLibrariesQuery,
  useResetStrategyStatsMutation,
  useUndoLastStrategyStatsMutation,
  useUpdateStrategyDetailsMutation,
  useUpdateStrategyStatsMutation,
} from "@/graphql/api";

import { loader } from "graphql.macro";
const GET_LIBRARIES = loader("../../queries/library/library.graphql");

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
  {
    deleteStrategyId,
    library_id,
  }: DeleteStrategyMutationVariables & { library_id: string },
  options?: DeleteStrategyMutationOptions
) => {
  const [deleteStrategyMutation, { data, loading, error }] =
    useDeleteStrategyMutation({
      variables: { deleteStrategyId },
      update: (cache, _) => {
        try {
          cache.updateQuery({ query: GET_LIBRARIES }, (libraries) => {
            if (!libraries || !libraries.getLibraries) return libraries; // Safeguard against null

            const updatedLibraries = libraries.getLibraries.map(
              (library: Library) => {
                if (library._id === library_id) {
                  // Filter out the strategy with the specified strategy_id
                  const updatedStrategies = library.strategies.filter(
                    (strategy) => strategy._id !== deleteStrategyId
                  );
                  return { ...library, strategies: updatedStrategies };
                }
                return library;
              }
            );
            return { getLibraries: updatedLibraries };
          });
        } catch (error) {
          console.error("Cache update error:", error);
        }
      },

      ...options,
    });

  return { deleteStrategyMutation, data, loading, error };
};

export const useUpdateStrategyDetailsMutationHook = (
  {
    strategy_id,
    name,
    description,
    library_id,
  }: UpdateStrategyDetailsInput & { library_id: string },
  options?: UpdateStrategyDetailsMutationOptions
) => {
  const [updateStrategyDetailsMutation, { data, loading, error }] =
    useUpdateStrategyDetailsMutation({
      variables: { updateStrategyInput: { strategy_id, name, description } },
      update: (cache, _) => {
        try {
          cache.updateQuery({ query: GET_LIBRARIES }, (libraries) => {
            const updatedLibraries = libraries?.getLibraries?.map(
              (library: Library) => {
                if (library?._id === library_id) {
                  const updatedStrategies = library.strategies.map(
                    (strategy) => {
                      if (strategy._id === strategy_id) {
                        return { ...strategy, name, description };
                      }
                      return strategy;
                    }
                  );
                  return { ...library, strategies: updatedStrategies };
                }
                return library;
              }
            );
            return { getLibraries: updatedLibraries };
          });
        } catch (error) {
          console.log(error);
        }
      },
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
