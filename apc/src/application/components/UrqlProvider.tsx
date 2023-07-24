// TODO change my location to another folder

import React, { FC } from 'react';

import { authExchange } from '@urql/exchange-auth';
import {
  createClient,
  Provider,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  makeOperation,
} from 'urql';

import { getAccessToken } from '$application/lib/auth/store';

const addAuthToOperation = ({ authState, operation }) => {
  if (!authState) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        // TODO: IW-452
        // Authorization: `bearer ${authState}`,
      },
    },
  });
};

const getAuth = async ({ authState }) => {
  if (!authState) return getAccessToken();
};

// This is for the future reference as we don't need SSR for now
// const isServerSide = typeof window === 'undefined';
// const ssr = ssrExchange({
//   isClient: !isServerSide,
//   initialState: !isServerSide ? (window as any).__URQL_DATA__ : undefined,
// });

const client = createClient({
  url: process.env.NEXT_PUBLIC_REPO_SERVER_ADDRESS!,
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({ addAuthToOperation, getAuth }),
    fetchExchange,
  ],
});

export const UrqlProvider: FC = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};

export default UrqlProvider;
