import { ReactNode } from "react";
import Head from "next/head";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import { Box } from "@mui/material";
import SnackbarProvider from "@/hooks/providers/SnackbarProvider";

import "../styles/globals.css";

import initAuth from "../api/auth/initAuth"; // next-firebase-authを初期化
initAuth();
import "../api/init-firebase-client"; // クライアント側firebaseを初期化

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppLayoutProps) => {
  //レイアウトを読み込み。対象は各pages毎に定義
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>DICE</title>
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "scroll",
              }}
            >
              {getLayout(<Component {...pageProps} />)}
            </Box>
          </SnackbarProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
