import React from 'react';

import { NextPage } from 'next';
import getConfig from 'next/config';
import ErrorPage from 'next/error';
import { RedocStandalone } from 'redoc';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    overflow: initial !important;
  }
`;

const { publicRuntimeConfig } = getConfig();

const documentation: NextPage = () => {
  if (publicRuntimeConfig.HIDE_DOCUMENTATION === 'true') {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div>
      <GlobalStyle />
      <RedocStandalone
        specUrl={`${publicRuntimeConfig.NEXT_PUBLIC_API_SERVER_ADDRESS}/openapi`}
      />
    </div>
  );
};

export default documentation;
