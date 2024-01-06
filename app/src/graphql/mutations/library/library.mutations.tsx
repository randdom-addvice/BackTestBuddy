import {
  useModifyLibraryMutation,
  ModifyLibraryMutationVariables,
  ModifyLibraryMutationOptions,
  useCreateLibraryMutation,
  CreateLibraryMutationVariables,
  CreateLibraryMutationOptions,
  useDeleteLibraryMutation,
  DeleteLibraryMutationVariables,
  DeleteLibraryMutationOptions,
} from "@/graphql/api";

export const useCreateLibraryMutationHook = (
  { createLibraryInput }: CreateLibraryMutationVariables,
  options?: CreateLibraryMutationOptions
) => {
  const [createLibrary, { data, loading, error }] = useCreateLibraryMutation({
    variables: { createLibraryInput },
    ...options,
  });
  return { createLibrary, data, loading, error };
};

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

export const useDeleteLibraryMutationHook = (
  { deleteLibraryId }: DeleteLibraryMutationVariables,
  options?: DeleteLibraryMutationOptions
) => {
  const [deleteLibrary, { data, loading, error }] = useDeleteLibraryMutation({
    variables: { deleteLibraryId },
    ...options,
  });
  return { deleteLibrary, data, loading, error };
};
