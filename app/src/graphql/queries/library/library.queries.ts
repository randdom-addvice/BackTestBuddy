import { useGetLibrariesQuery } from "@/graphql/api";

export const useGetLibrariesQueryHook = () => {
  const { loading, data, error, refetch } = useGetLibrariesQuery();
  return {
    data,
    loading,
    error,
    refetch,
  };
};
