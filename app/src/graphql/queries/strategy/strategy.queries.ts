import {
  GetStrategyQueryVariables,
  useGetStrategySuspenseQuery,
  useGetStrategyQuery,
  GetStrategyQuery,
} from "@/graphql/api";
import { SuspenseQueryHookOptions, QueryHookOptions } from "@apollo/client";

export const useGetStrategyQueryHook = (
  args: GetStrategyQueryVariables,
  options?: QueryHookOptions<GetStrategyQuery, GetStrategyQueryVariables>
) => {
  const { data, error } = useGetStrategyQuery({
    variables: {
      getStrategyId: args.getStrategyId,
    },
    ...options,
  });

  return { data, error };
};
