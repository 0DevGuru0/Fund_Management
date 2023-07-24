import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { getAccessToken } from './auth/store';

const axiosClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_ADDRESS,
  timeout: 10000,
});

export const orvalFetchMutator = <T>(config: AxiosRequestConfig): Promise<T> => {
  if (config.method?.toLowerCase() === 'purge') {
    throw new Error('Method PURGE is not supported');
  }

  const responseType = config.responseType ?? 'json';

  if (responseType === 'document') {
    throw new Error(`This response type is not supported: ${responseType}`);
  }

  const headers = config.headers ?? {};

  const accessToken = getAccessToken();

  if (accessToken) {
    headers.authorization = headers.authorization || `Bearer ${accessToken}`;
  }

  const source = Axios.CancelToken.source();

  const promise = new Promise<T>((resolve, reject) => {
    axiosClient
      .request<T>({
        ...config,
        headers,
        cancelToken: source.token,
      })
      .then((response) => resolve(response.data))
      .catch((err: AxiosError) => {
        const error = err.isAxiosError ? err.response?.data ?? err.message : err;

        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.info(`Failed calling [${config.method}] ${config.url}`);
          // eslint-disable-next-line no-console
          console.warn('[Fetch Mutator] An API request error happened: ', error);
        }

        reject(error);
      });
  });

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('[Fetch Mutator] Request was cancelled');
  };

  return promise;
};
