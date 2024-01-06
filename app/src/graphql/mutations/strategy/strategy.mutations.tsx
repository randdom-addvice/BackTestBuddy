import {
  CreateStrategyMutationOptions,
  CreateStrategyMutationVariables,
  useCreateStrategyMutation,
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
