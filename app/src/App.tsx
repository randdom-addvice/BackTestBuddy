import Routes from "./routes/Routes";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme";
import GlobalStyle from "./styles/globalStyles";
import { Helmet } from "react-helmet";
import ApolloProviderWrapper from "./graphql/ApolloProvider";
import { Suspense } from "react";

const App = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>BackTest Buddy</title>
      </Helmet>
      <ApolloProviderWrapper>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <Suspense fallback={<div>Loading ...</div>}>
            <Routes />
          </Suspense>
        </ThemeProvider>
      </ApolloProviderWrapper>
    </>
  );
};

export default App;
