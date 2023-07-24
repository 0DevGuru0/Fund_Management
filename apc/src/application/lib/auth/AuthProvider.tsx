/* eslint-disable no-console */
import React, { createContext, useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';

import { request } from '$application/lib/request';
import { RefreshTokenResponse } from '$pages/api/v1/auth/refreshToken';
import { KeyCloakToken } from '$service/auth/Token';

import { userTokenAtom, storeAccessToken, accessTokenAtom } from './store';

const tokenRefreshWindow = 30 * 1000;

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [decodedAccessToken, setDecodedAccessToken] = useAtom(userTokenAtom);
  const setAccessToken = useUpdateAtom(accessTokenAtom);

  const startRefreshingAccessToken = useCallback(async () => {
    try {
      const { accessToken } = await request<RefreshTokenResponse>('/auth/refreshToken');
      storeAccessToken(accessToken);
      setAccessToken(accessToken);
      if (process.env.NODE_ENV) {
        console.info('Your JWT access token is: ', accessToken);
      }

      const decodedToken = jwtDecode<KeyCloakToken>(accessToken);
      setDecodedAccessToken(decodedToken);

      // refresh the token ${tokenRefreshWindow} milliseconds before expiration
      const remainingToExpiration = decodedToken.exp * 1000 - Date.now();

      // This is to prevent integer overflow for setTimeout when access token expires in more than a month
      const millisToNextCheck = Math.min(
        remainingToExpiration - tokenRefreshWindow,
        24 * 60 * 60 * 1000, // 24h is the max value for refresh interval
      );

      return setTimeout(startRefreshingAccessToken, millisToNextCheck);
    } catch (err) {
      // means we don't have a proper refresh token so user should login
      router.push('/api/v1/auth/login', undefined, { shallow: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /** we should refresh on page load as we store access token in memory */
    startRefreshingAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context = {
    startRefreshingAccessToken,
  };

  return (
    <AuthContext.Provider value={context}>
      {decodedAccessToken && children}
    </AuthContext.Provider>
  );
};
