import { FC } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import { Box } from "@mui/material";

import "../styles/globals.css";

import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App: FC<MyAppProps> = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Box
            sx={{
              display: "flex",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <HomeLayout>
              <Component {...pageProps} />
            </HomeLayout>
          </Box>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
