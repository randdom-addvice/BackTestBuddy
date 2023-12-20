// import { gql, useMutation } from "@apollo/client";
// import { REGISTER_USER } from "./auth.mutations";

import {
  LoginUserMutationOptions,
  LoginUserMutationVariables,
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../api";

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

// export const useRegisterUserMutation = (args: {
//   email: string;
//   firstName: string;
//   lastName: string;
//   password: string;
// }) => {
//   const [registerUserMutation, { error, data }] = useMutation<
//     { registerUser: string },
//     { input: RegisterInput }
//   >(REGISTER_USER, {
//     variables: {
//       input: {
//         first_name: args.firstName,
//         last_name: args.lastName,
//         email: args.email,
//         password: args.email,
//       },
//     },
//   });

//   return { registerUserMutation, data, error };
// };
// export const useLoginUserMutation = (args: LoginInput) => {
// const [loginUserMutation, { error, data }] = useMutation(LOGIN_USER, {
//   variables: {
//     email: args.email,
//     password: args.email,
//   },
// });

// return { loginUserMutation, data, error };
// };
