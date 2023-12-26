import { QueryHookOptions } from "@apollo/client";
import {
  GetUserQuery,
  GetUserQueryVariables,
  useGetUserLazyQuery,
  useGetUserQuery,
} from "@/graphql/api";
import { useAppDispatch } from "@/redux/hooks";
import { authActions } from "@/redux/reducers/auth/authSlice";

export const useGetUserQueryHook = (
  options?: QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) => {
  console.log("i must not see it run here");
  const dispatch = useAppDispatch();
  const { data, loading, error } = useGetUserQuery(options);
  if (data?.getUser) dispatch(authActions.setUserData(data?.getUser));

  return { data, loading, error };
};
export const useLazyGetUserQueryHook = (
  options?: QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) => {
  const dispatch = useAppDispatch();
  const [lazyGetUser, { loading, data, error }] = useGetUserLazyQuery(options);

  if (data?.getUser) dispatch(authActions.setUserData(data?.getUser));

  return {
    lazyGetUser: () => {
      console.log("call getUser Query");
      lazyGetUser();
    },
    data,
    loading,
    error,
  };
};
