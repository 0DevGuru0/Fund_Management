import React, { useEffect } from 'react';

import gsap from 'gsap';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

import UrqlProvider from '$application/components/UrqlProvider';
import { AuthProvider } from '$application/lib/auth/AuthProvider';
import { getReactQueryClient } from '$application/lib/getReactQueryClient';
import { gsapConfig } from '$application/lib/gsap/gsap.config';
import { useProgressBar } from '$application/lib/hooks/useProgressBar';
import { ThemeProvider } from '$application/theme/ThemeProvider';

import '$application/components/organisms/forms/FormModal/Form/isolatedBootstrap.scss';

import Layout from './_layout';

const appConfigs = { title: process.env.NEXT_PUBLIC_APP_TITLE, favicon: '/favicon.ico' };

export const REACT_QUERY_STATE_KEY = 'REACT_QUERY_DEHYDRATED_STATE';

const ApcApp = ({ Component, pageProps }: AppProps) => {
  useProgressBar();

  gsap.defaults(gsapConfig);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{appConfigs.title}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
        <link rel="shortcut icon" href={appConfigs.favicon} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="referrer" content="always" />
      </Head>
      <QueryClientProvider client={getReactQueryClient()}>
        <Hydrate state={pageProps[REACT_QUERY_STATE_KEY]}>
          <AuthProvider>
            <UrqlProvider>
              <ThemeProvider>
                <Layout {...pageProps}>
                  <Component {...pageProps} />
                </Layout>
              </ThemeProvider>
            </UrqlProvider>
          </AuthProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default ApcApp;
