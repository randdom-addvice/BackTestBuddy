import { ApolloProvider } from "@apollo/client";
import { NextPage } from "next";
import apolloClient from "./ApolloClient";

export const withApollo = (PageComponent: NextPage) => {
  const WithApollo: NextPage = (pageProps) => (
    <ApolloProvider client={apolloClient}>
      <PageComponent {...pageProps} />
    </ApolloProvider>
  );

  if (PageComponent.displayName) {
    WithApollo.displayName = `withApollo(${PageComponent.displayName})`;
  } else if (PageComponent.name) {
    WithApollo.displayName = `withApollo(${PageComponent.name})`;
  } else {
    WithApollo.displayName = "withApollo";
  }

  return WithApollo;
};
