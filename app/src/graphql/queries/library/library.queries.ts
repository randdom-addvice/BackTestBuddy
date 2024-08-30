import { useGetLibrariesQuery } from "@/graphql/api";

export const useGetLibrariesQueryHook = () => {
  const { loading, data, error, refetch } = useGetLibrariesQuery({
    fetchPolicy: "cache-and-network",
  });
  return {
    data,
    loading,
    error,
    refetch,
  };
};
