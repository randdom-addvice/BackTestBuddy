import { Suspense } from "react";
import Routes from "@/routes/Routes";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "@/styles/theme";
import GlobalStyle from "@/styles/globalStyles";
import { Helmet } from "react-helmet";
import ApolloProviderWrapper from "@/graphql/ApolloProvider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const App = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>BackTest Buddy</title>
      </Helmet>
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <ApolloProviderWrapper>
            <GlobalStyle />
            <Suspense fallback={<div>Loading ...</div>}>
              <Routes />
            </Suspense>
          </ApolloProviderWrapper>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
