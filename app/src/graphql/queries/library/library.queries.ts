import { useGetLibrariesQuery } from "@/graphql/api";

export const useGetLibrariesQueryHook = () => {
  const { loading, data, error } = useGetLibrariesQuery();
  return {
    data,
    loading,
    error,
  };
};
