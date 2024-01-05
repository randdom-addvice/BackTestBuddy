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

export type CreateLibraryInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateStrategyInput = {
  description: Scalars['String']['input'];
  library_id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  startingBalance: Scalars['Int']['input'];
};

export type Growth = {
  __typename?: 'Growth';
  asset: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type Library = {
  __typename?: 'Library';
  _id: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  strategies: Array<Strategy>;
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
  createLibraryInput?: InputMaybe<CreateLibraryInput>;
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
  getLibraries: Array<Maybe<Library>>;
  getStrategies: Array<Maybe<Strategy>>;
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
  balance: Scalars['Int']['output'];
  growth: Array<Maybe<Growth>>;
  initialBalance: Scalars['Int']['output'];
  lossCountValue: Scalars['Float']['output'];
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

export type ModifyLibraryMutationVariables = Exact<{
  modifyLibraryInput?: InputMaybe<ModfiyLibraryInput>;
}>;


export type ModifyLibraryMutation = { __typename?: 'Mutation', modifyLibrary?: boolean | null };

export type DeleteLibraryMutationVariables = Exact<{
  deleteLibraryId: Scalars['ID']['input'];
}>;


export type DeleteLibraryMutation = { __typename?: 'Mutation', deleteLibrary?: boolean | null };

export type CreateLibraryMutationVariables = Exact<{
  createLibraryInput?: InputMaybe<CreateLibraryInput>;
}>;


export type CreateLibraryMutation = { __typename?: 'Mutation', createLibrary?: boolean | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', _id: string, username: string, first_name: string, last_name: string, email: string, email_verified: boolean } | null };

export type GetLibrariesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLibrariesQuery = { __typename?: 'Query', getLibraries: Array<{ __typename?: 'Library', _id: string, name: string, description: string, user_id: string, strategies: Array<{ __typename?: 'Strategy', _id: string, library_id: string, name: string, description: string, tradeStats: { __typename?: 'TradeStats', _id?: string | null, balance: number, totalTrades: number, percentageWin: number, profitGain: number, profitFactor: number } }> } | null> };

export type GetStrategyQueryVariables = Exact<{
  getStrategyId: Scalars['ID']['input'];
}>;


export type GetStrategyQuery = { __typename?: 'Query', getStrategy?: { __typename?: 'Strategy', _id: string, library_id: string, name: string, description: string, tradeStats: { __typename?: 'TradeStats', _id?: string | null, winCountValue: number, lossCountValue: number, balance: number, initialBalance: number, totalTrades: number, totalLossesPercent: number, totalWinningsPercent: number, totalLosses: number, totalWinnings: number, percentageWin: number, profitGain: number, profitFactor: number, tradesSequence: Array<number | null>, growth: Array<{ __typename?: 'Growth', asset: string, value: number } | null> } } | null };


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
export const ModifyLibraryDocument = gql`
    mutation ModifyLibrary($modifyLibraryInput: ModfiyLibraryInput) {
  modifyLibrary(modifyLibraryInput: $modifyLibraryInput)
}
    `;
export type ModifyLibraryMutationFn = Apollo.MutationFunction<ModifyLibraryMutation, ModifyLibraryMutationVariables>;

/**
 * __useModifyLibraryMutation__
 *
 * To run a mutation, you first call `useModifyLibraryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyLibraryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyLibraryMutation, { data, loading, error }] = useModifyLibraryMutation({
 *   variables: {
 *      modifyLibraryInput: // value for 'modifyLibraryInput'
 *   },
 * });
 */
export function useModifyLibraryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ModifyLibraryMutation, ModifyLibraryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ModifyLibraryMutation, ModifyLibraryMutationVariables>(ModifyLibraryDocument, options);
      }
export type ModifyLibraryMutationHookResult = ReturnType<typeof useModifyLibraryMutation>;
export type ModifyLibraryMutationResult = Apollo.MutationResult<ModifyLibraryMutation>;
export type ModifyLibraryMutationOptions = Apollo.BaseMutationOptions<ModifyLibraryMutation, ModifyLibraryMutationVariables>;
export const DeleteLibraryDocument = gql`
    mutation DeleteLibrary($deleteLibraryId: ID!) {
  deleteLibrary(id: $deleteLibraryId)
}
    `;
export type DeleteLibraryMutationFn = Apollo.MutationFunction<DeleteLibraryMutation, DeleteLibraryMutationVariables>;

/**
 * __useDeleteLibraryMutation__
 *
 * To run a mutation, you first call `useDeleteLibraryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLibraryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLibraryMutation, { data, loading, error }] = useDeleteLibraryMutation({
 *   variables: {
 *      deleteLibraryId: // value for 'deleteLibraryId'
 *   },
 * });
 */
export function useDeleteLibraryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteLibraryMutation, DeleteLibraryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteLibraryMutation, DeleteLibraryMutationVariables>(DeleteLibraryDocument, options);
      }
export type DeleteLibraryMutationHookResult = ReturnType<typeof useDeleteLibraryMutation>;
export type DeleteLibraryMutationResult = Apollo.MutationResult<DeleteLibraryMutation>;
export type DeleteLibraryMutationOptions = Apollo.BaseMutationOptions<DeleteLibraryMutation, DeleteLibraryMutationVariables>;
export const CreateLibraryDocument = gql`
    mutation CreateLibrary($createLibraryInput: CreateLibraryInput) {
  createLibrary(createLibraryInput: $createLibraryInput)
}
    `;
export type CreateLibraryMutationFn = Apollo.MutationFunction<CreateLibraryMutation, CreateLibraryMutationVariables>;

/**
 * __useCreateLibraryMutation__
 *
 * To run a mutation, you first call `useCreateLibraryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLibraryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLibraryMutation, { data, loading, error }] = useCreateLibraryMutation({
 *   variables: {
 *      createLibraryInput: // value for 'createLibraryInput'
 *   },
 * });
 */
export function useCreateLibraryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateLibraryMutation, CreateLibraryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateLibraryMutation, CreateLibraryMutationVariables>(CreateLibraryDocument, options);
      }
export type CreateLibraryMutationHookResult = ReturnType<typeof useCreateLibraryMutation>;
export type CreateLibraryMutationResult = Apollo.MutationResult<CreateLibraryMutation>;
export type CreateLibraryMutationOptions = Apollo.BaseMutationOptions<CreateLibraryMutation, CreateLibraryMutationVariables>;
export const GetUserDocument = gql`
    query GetUser {
  getUser {
    _id
    username
    first_name
    last_name
    email
    email_verified
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetLibrariesDocument = gql`
    query GetLibraries {
  getLibraries {
    _id
    name
    description
    user_id
    strategies {
      _id
      library_id
      name
      description
      tradeStats {
        _id
        balance
        totalTrades
        percentageWin
        profitGain
        profitFactor
      }
    }
  }
}
    `;

/**
 * __useGetLibrariesQuery__
 *
 * To run a query within a React component, call `useGetLibrariesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLibrariesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLibrariesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLibrariesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetLibrariesQuery, GetLibrariesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetLibrariesQuery, GetLibrariesQueryVariables>(GetLibrariesDocument, options);
      }
export function useGetLibrariesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLibrariesQuery, GetLibrariesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetLibrariesQuery, GetLibrariesQueryVariables>(GetLibrariesDocument, options);
        }
export function useGetLibrariesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetLibrariesQuery, GetLibrariesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetLibrariesQuery, GetLibrariesQueryVariables>(GetLibrariesDocument, options);
        }
export type GetLibrariesQueryHookResult = ReturnType<typeof useGetLibrariesQuery>;
export type GetLibrariesLazyQueryHookResult = ReturnType<typeof useGetLibrariesLazyQuery>;
export type GetLibrariesSuspenseQueryHookResult = ReturnType<typeof useGetLibrariesSuspenseQuery>;
export type GetLibrariesQueryResult = Apollo.QueryResult<GetLibrariesQuery, GetLibrariesQueryVariables>;
export const GetStrategyDocument = gql`
    query GetStrategy($getStrategyId: ID!) {
  getStrategy(id: $getStrategyId) {
    _id
    library_id
    name
    description
    tradeStats {
      _id
      winCountValue
      lossCountValue
      balance
      initialBalance
      totalTrades
      totalLossesPercent
      totalWinningsPercent
      totalLosses
      totalWinnings
      percentageWin
      profitGain
      profitFactor
      tradesSequence
      growth {
        asset
        value
      }
    }
  }
}
    `;

/**
 * __useGetStrategyQuery__
 *
 * To run a query within a React component, call `useGetStrategyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStrategyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStrategyQuery({
 *   variables: {
 *      getStrategyId: // value for 'getStrategyId'
 *   },
 * });
 */
export function useGetStrategyQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetStrategyQuery, GetStrategyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetStrategyQuery, GetStrategyQueryVariables>(GetStrategyDocument, options);
      }
export function useGetStrategyLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetStrategyQuery, GetStrategyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetStrategyQuery, GetStrategyQueryVariables>(GetStrategyDocument, options);
        }
export function useGetStrategySuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetStrategyQuery, GetStrategyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetStrategyQuery, GetStrategyQueryVariables>(GetStrategyDocument, options);
        }
export type GetStrategyQueryHookResult = ReturnType<typeof useGetStrategyQuery>;
export type GetStrategyLazyQueryHookResult = ReturnType<typeof useGetStrategyLazyQuery>;
export type GetStrategySuspenseQueryHookResult = ReturnType<typeof useGetStrategySuspenseQuery>;
export type GetStrategyQueryResult = Apollo.QueryResult<GetStrategyQuery, GetStrategyQueryVariables>;