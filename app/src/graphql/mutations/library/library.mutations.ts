import {
  useModifyLibraryMutation,
  ModifyLibraryMutationVariables,
  ModifyLibraryMutationOptions,
} from "@/graphql/api";

export const useModifyLibraryMutationHook = (
  { modifyLibraryInput }: ModifyLibraryMutationVariables,
  options?: ModifyLibraryMutationOptions
) => {
  const [updateLibrary, { data, loading, error }] = useModifyLibraryMutation({
    variables: { modifyLibraryInput },
    ...options,
  });
  return { updateLibrary, data, loading, error };
};
