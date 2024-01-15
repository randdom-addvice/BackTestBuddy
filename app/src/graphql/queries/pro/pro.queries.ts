import { useGetProFeaturesQuery } from "@/graphql/api";

export const useGetProFeaturesHook = () => {
  const { data, loading, error } = useGetProFeaturesQuery({
    fetchPolicy: "cache-first",
  });

  return {
    data,
    loading,
    error,
  };
};
