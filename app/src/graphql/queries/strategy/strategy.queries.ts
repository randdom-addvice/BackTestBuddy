import {
  GetStrategyQueryVariables,
  useGetStrategySuspenseQuery,
  useGetStrategyQuery,
  GetStrategyQuery,
} from "@/graphql/api";
import { useAppDispatch } from "@/redux/hooks";
import { strategyActions } from "@/redux/reducers/strategy/strategySlice";
import { SuspenseQueryHookOptions, QueryHookOptions } from "@apollo/client";
import { useEffect } from "react";

export const useGetStrategyQueryHook = (
  args: GetStrategyQueryVariables,
  options?: QueryHookOptions<GetStrategyQuery, GetStrategyQueryVariables>
) => {
  const dispatch = useAppDispatch();
  const { data, error } = useGetStrategyQuery({
    variables: {
      getStrategyId: args.getStrategyId,
    },
    ...options,
  });
  useEffect(() => {
    if (data?.getStrategy)
      dispatch(strategyActions.setSelectedStrategyMetrix(data.getStrategy));
  }, [data]);

  return { data, error };
};
