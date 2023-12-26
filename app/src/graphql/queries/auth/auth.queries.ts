import { QueryHookOptions } from "@apollo/client";
import {
  GetUserQuery,
  GetUserQueryVariables,
  useGetUserQuery,
} from "../../api";

export const useLoginUserHook = (
  options?: QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) => {
  const { data, loading, error } = useGetUserQuery(options);
  console.log(data);

  return { data, loading, error };
};
