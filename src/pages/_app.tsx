import * as React from 'react';

import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';

import createEmotionCache from '../styles/createEmotionCache';
import theme from '../styles/theme';
import '../styles/globals.css';

import type { EmotionCache } from '@emotion/react';
import type { AppProps } from 'next/app';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../../mocks').catch((err) => console.error(err));
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) => (
  <CacheProvider value={emotionCache}>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ThemeProvider>
  </CacheProvider>
);

export default MyApp;
