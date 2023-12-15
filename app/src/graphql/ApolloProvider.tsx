import React from "react";
import { ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = null;
  return {
    headers: {
      ...headers,
      authorization: token ?? "",
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ApolloProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;

export default ApolloProviderWrapper;
