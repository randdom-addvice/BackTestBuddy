import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import GlobalErrorMessageToast from "../components/global/GlobalErrorMessageToast";

const ApolloProviderWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
        setErrorMessage(message);
        setShowError(true);
      });
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      setErrorMessage("Network Error");
      setShowError(true);
    }
  });

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
    link: from([errorLink, httpLink, authLink]), //authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <GlobalErrorMessageToast
        showError={showError}
        setShowError={setShowError}
        errorMessage={errorMessage}
      />
      {children}
    </ApolloProvider>
  );
};

export default ApolloProviderWrapper;
