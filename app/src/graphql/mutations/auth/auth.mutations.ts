// import { gql, useMutation } from "@apollo/client";
// import { REGISTER_USER } from "./auth.mutations";

import {
  LoginUserMutationOptions,
  LoginUserMutationVariables,
  RegisterUserMutationOptions,
  RegisterUserMutationVariables,
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/graphql/api";

export const useLoginUserHook = (
  args: LoginUserMutationVariables,
  options?: LoginUserMutationOptions
) => {
  const [loginUser, { data, loading, error }] = useLoginUserMutation({
    variables: args,
    ...options,
  });
  return { loginUser, data, loading, error };
};

export const useRegisterUserHook = (
  args: RegisterUserMutationVariables,
  options?: RegisterUserMutationOptions
) => {
  const [registerUser, { data, loading, error }] = useRegisterUserMutation({
    variables: args,
    ...options,
  });
  return { registerUser, data, loading, error };
};
