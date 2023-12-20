import Routes from "./routes/Routes";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme";
import GlobalStyle from "./styles/globalStyles";
import { Helmet } from "react-helmet";
import ApolloProviderWrapper from "./graphql/ApolloProvider";
import { Suspense } from "react";
import GlobalErrorMessageToast from "./components/global/GlobalErrorMessageToast";

const App = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>BackTest Buddy</title>
      </Helmet>
      <ThemeProvider theme={defaultTheme}>
        <ApolloProviderWrapper>
          <GlobalStyle />
          <Suspense fallback={<div>Loading ...</div>}>
            <Routes />
          </Suspense>
        </ApolloProviderWrapper>
      </ThemeProvider>
      {/* <GlobalErrorMessageToast>
        {(showError) => (
          <ApolloProviderWrapper showError={showError}>
            <ThemeProvider theme={defaultTheme}>
              <GlobalStyle />
              <Suspense fallback={<div>Loading ...</div>}>
                <Routes />
              </Suspense>
            </ThemeProvider>
          </ApolloProviderWrapper>
        )}
      </GlobalErrorMessageToast> */}
    </>
  );
};

export default App;
