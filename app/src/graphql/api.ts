import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateStrategyInput = {
  description: Scalars['String']['input'];
  library_id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type Library = {
  __typename?: 'Library';
  _id: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  strategies?: Maybe<Array<Maybe<Strategy>>>;
  user_id: Scalars['String']['output'];
};

export type ModfiyLibraryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  library_id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createLibrary?: Maybe<Scalars['Boolean']['output']>;
  createStrategy: Scalars['String']['output'];
  deleteLibrary?: Maybe<Scalars['Boolean']['output']>;
  deleteStrategy: Scalars['Boolean']['output'];
  loginUser: Scalars['String']['output'];
  modifyLibrary?: Maybe<Scalars['Boolean']['output']>;
  registerUser: Scalars['String']['output'];
  updateStrategyDetails: Scalars['Boolean']['output'];
  updateStrategyStats: Scalars['Boolean']['output'];
};


export type MutationCreateLibraryArgs = {
  createLibraryInput?: InputMaybe<ModfiyLibraryInput>;
};


export type MutationCreateStrategyArgs = {
  createStrategyInput?: InputMaybe<CreateStrategyInput>;
};


export type MutationDeleteLibraryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteStrategyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationModifyLibraryArgs = {
  modifyLibraryInput?: InputMaybe<ModfiyLibraryInput>;
};


export type MutationRegisterUserArgs = {
  registerUserInput?: InputMaybe<RegisterUserInput>;
};


export type MutationUpdateStrategyDetailsArgs = {
  updateStrategyInput?: InputMaybe<UpdateStrategyDetailsInput>;
};


export type MutationUpdateStrategyStatsArgs = {
  strategy_id: Scalars['ID']['input'];
  updateStrategyStatsInput?: InputMaybe<UpdateStrategyStatsInput>;
};

export type Query = {
  __typename?: 'Query';
  getLibraries?: Maybe<Array<Maybe<Library>>>;
  getStrategies?: Maybe<Array<Maybe<Strategy>>>;
  getStrategy?: Maybe<Strategy>;
  getUser?: Maybe<User>;
};


export type QueryGetStrategiesArgs = {
  library_id: Scalars['ID']['input'];
};


export type QueryGetStrategyArgs = {
  id: Scalars['ID']['input'];
};

export type RegisterUserInput = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Strategy = {
  __typename?: 'Strategy';
  _id: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  library_id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tradeStats: TradeStats;
};

export type TradeStats = {
  __typename?: 'TradeStats';
  _id?: Maybe<Scalars['ID']['output']>;
  growth: Array<Maybe<Scalars['Float']['output']>>;
  lossCountValue: Scalars['Float']['output'];
  percentage?: Maybe<Scalars['String']['output']>;
  percentageWin: Scalars['Int']['output'];
  profitFactor: Scalars['Int']['output'];
  profitGain: Scalars['Int']['output'];
  totalLosses: Scalars['Int']['output'];
  totalLossesPercent: Scalars['Int']['output'];
  totalTrades: Scalars['Int']['output'];
  totalWinnings: Scalars['Int']['output'];
  totalWinningsPercent: Scalars['Int']['output'];
  tradesSequence: Array<Maybe<Scalars['Float']['output']>>;
  winCountValue: Scalars['Float']['output'];
};

export type UpdateStrategyDetailsInput = {
  description: Scalars['String']['input'];
  strategy_id: Scalars['ID']['input'];
  winCountValue: Scalars['Float']['input'];
};

export type UpdateStrategyStatsInput = {
  growth: Array<InputMaybe<Scalars['Float']['input']>>;
  lossCountValue: Scalars['Float']['input'];
  profitFactor: Scalars['Float']['input'];
  profitGain: Scalars['Float']['input'];
  totalLosses: Scalars['Int']['input'];
  totalWinnings: Scalars['Int']['input'];
  tradesSequence: Array<InputMaybe<Scalars['Float']['input']>>;
  winCountValue: Scalars['Float']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  email_verified: Scalars['Boolean']['output'];
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type RegisterUserMutationVariables = Exact<{
  registerUserInput?: InputMaybe<RegisterUserInput>;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: string };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: string };


export const RegisterUserDocument = gql`
    mutation RegisterUser($registerUserInput: RegisterUserInput) {
  registerUser(registerUserInput: $registerUserInput)
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      registerUserInput: // value for 'registerUserInput'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password)
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;