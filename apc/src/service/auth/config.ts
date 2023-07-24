import { pickBy } from 'lodash';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const cookiePrefix = 'SMARTFUND';

export interface IAuthConfig {
  authProviderEndpoint: string;
  apiServerAddress: string;
  serverAddress: string;
  clientID: string;
  clientSecret: string;
  tokenEncryptionSecret: string;
  refreshTokenCookie: string;
  oidcStateCookie: string;
}

export const authConfig: IAuthConfig = {
  apiServerAddress: process.env.NEXT_PUBLIC_API_SERVER_ADDRESS!,
  serverAddress: process.env.NEXT_PUBLIC_SERVER_ADDRESS!,
  authProviderEndpoint: serverRuntimeConfig.OIDC_ENDPOINT,
  clientID: serverRuntimeConfig.OIDC_CLIENT_ID,
  clientSecret: serverRuntimeConfig.OIDC_CLIENT_SECRET_KEY,
  tokenEncryptionSecret: serverRuntimeConfig.OIDC_TOKEN_ENCRYPTION_SECRET_KEY,
  refreshTokenCookie: `${cookiePrefix}_ORT`, // oidc refresh token
  oidcStateCookie: `${cookiePrefix}_OIDCST`, // oidc state
};

const emptyKeys = Object.keys(pickBy(authConfig, (val) => val == null));
if (emptyKeys.length > 0 && process.env.NODE_ENV !== 'test') {
  throw new Error(`Auth: the following configs ${emptyKeys.join(', ')} are not provided`);
}
