import { createDecoder, createVerifier } from 'fast-jwt';
import jwksClient, { JwksClient } from 'jwks-rsa';
import { NextApiRequest, NextApiResponse } from 'next';
import { custom, Issuer, Client, generators } from 'openid-client';

import { getCookie } from '$service/auth/cookie/getCookie';
import { removeCookie } from '$service/auth/cookie/removeCookie';
import { setCookie } from '$service/auth/cookie/setCookie';
import {
  InternalServerError,
  InvalidTokenError,
  TokenRequiredError,
  UnauthorizedError,
} from '$service/errors';

import { authConfig } from './config';
import { decryptJson, encryptJson } from './cookie/encryption';
import { KeyCloakToken, RefreshToken } from './Token';

import { sysLog } from '$logger';

type JWTVerifier = ReturnType<typeof createVerifier>;

interface OIDCState {
  codeVerifier: string;
  originalURL: string;
}

export class AuthenticationManager {
  client!: Client;
  issuer!: Issuer<Client>;
  jwksClient!: JwksClient;
  redirectURI!: string;
  postLogoutRedirectUrl!: string;
  private jwtVerifier?: JWTVerifier;

  constructor() {}

  async init(): Promise<void> {
    custom.setHttpOptionsDefaults({
      timeout: 45000,
    });

    let issuer = await Issuer.discover(authConfig.authProviderEndpoint);
    issuer = new Issuer({
      // TODO: this is keycloak specific as it does not provide revocation endpoint in discovery
      revocation_endpoint: `${authConfig.authProviderEndpoint}/protocol/openid-connect/revoke`,
      ...issuer.metadata,
    });

    this.jwksClient = jwksClient({
      jwksUri: issuer.metadata.jwks_uri!,
    });

    sysLog.info(`Connected to OIDC Provider`);

    this.redirectURI = `${authConfig.apiServerAddress}/auth/loginCallback`;
    this.postLogoutRedirectUrl = authConfig.serverAddress;
    this.client = new issuer.Client({
      client_id: authConfig.clientID,
      client_secret: authConfig.clientSecret,
      redirect_uris: [this.redirectURI],
      post_logout_redirect_uris: [this.postLogoutRedirectUrl],
      response_types: ['code'],
    });
  }

  getJWTVerifier(): JWTVerifier {
    if (!this.jwtVerifier) {
      this.jwtVerifier = createVerifier({
        key: async (token) => {
          const skey = await this.jwksClient.getSigningKey(token.kid);
          return skey.getPublicKey();
        },
        cache: true,
      });
    }
    return this.jwtVerifier;
  }

  async verifyAndDecodeAccessToken(
    req: NextApiRequest,
  ): Promise<KeyCloakToken | undefined> {
    const verifyToken = this.getJWTVerifier();
    const accessToken = this.getAccessToken(req);

    if (accessToken) {
      try {
        return await verifyToken(accessToken);
      } catch (err) {
        throw new UnauthorizedError((err as any).toString());
      }
    }
  }

  private getAccessToken(req: NextApiRequest): string | undefined {
    if (!req.headers.authorization) {
      return;
    }
    const [, accessToken] = req.headers.authorization.split(' ');
    return accessToken;
  }

  private getRefreshToken(req: NextApiRequest): any | void {
    const encryptedRefreshToken = getCookie(req, authConfig.refreshTokenCookie);
    if (encryptedRefreshToken == null) {
      return;
    }
    return decryptJson(encryptedRefreshToken, authConfig.tokenEncryptionSecret);
  }

  // get a new access token for the user if they have a valid refresh token
  async refreshToken(
    req: NextApiRequest,
    res: NextApiResponse,
  ): Promise<{ accessToken: string }> {
    try {
      const refreshToken = this.getRefreshToken(req);

      if (refreshToken) {
        const { exp } = createDecoder()(refreshToken) as RefreshToken;
        if (Date.now() / 1000 > exp) {
          throw new UnauthorizedError(
            `refresh token has expired at ${new Date(exp).toISOString()}`,
          );
        }

        // refresh token is not expired! we can refresh the access token.
        const tokenSet = await this.client.refresh(refreshToken);
        return { accessToken: tokenSet.access_token! };
      } else {
        throw new TokenRequiredError('no refresh token found');
      }
    } catch (err) {
      // invalid refresh token (auth provider rejected)
      if (!(err instanceof TokenRequiredError)) {
        throw new InvalidTokenError('refresh token is not valid');
      } else {
        throw err;
      }
    }
  }

  async loginHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    // don't do anything if user has a valid access token
    try {
      const accessToken = await this.verifyAndDecodeAccessToken(req);
      if (accessToken) {
        // user is already logged in so we redirect to webapps root
        res.redirect('/');
        return;
      }
    } catch (err) {
      // invalid access token. we should proceed with login process.
    }

    const codeVerifier = generators.codeVerifier(); // this generates a nonce
    const codeChallenge = generators.codeChallenge(codeVerifier);

    // encrypt and store the PKCE code verifier and original URL on a cookie
    // Checkout IW-829
    const originalURL = req.headers.referer ?? authConfig.serverAddress;
    const oidcState = encryptJson<OIDCState>(
      { codeVerifier, originalURL },
      authConfig.tokenEncryptionSecret,
    );
    setCookie(res, {
      name: authConfig.oidcStateCookie,
      value: oidcState,
      options: { httpOnly: true },
    });

    // initiate an oidc code flow + PKCE
    const oidcProviderUrl = this.client.authorizationUrl({
      scope: 'openid email profile',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    // the authentication provider will call callback after this
    res.redirect(oidcProviderUrl);
  }

  async callbackHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    // params contains { code, session_state } (code flow)
    const params = this.client.callbackParams(req);
    // get (and decrypt) PKCE code_verifier and originalURL from cookie
    const stateCookie = getCookie(req, authConfig.oidcStateCookie);
    if (stateCookie == null) {
      throw new UnauthorizedError();
    }
    const { codeVerifier, originalURL } = decryptJson(
      stateCookie,
      authConfig.tokenEncryptionSecret,
    );

    // get token set from Auth Provider
    const tokenSet = await this.client.callback(this.redirectURI, params, {
      code_verifier: codeVerifier,
    });

    // encrypt and store refresh token on an http-only cookie
    const refreshToken = tokenSet.refresh_token;
    if (!refreshToken) {
      throw new InternalServerError('Refresh token is not defined');
    }
    const { exp } = createDecoder()(refreshToken) as RefreshToken;

    setCookie(res, {
      name: authConfig.refreshTokenCookie,
      value: encryptJson(refreshToken, authConfig.tokenEncryptionSecret),
      options: { httpOnly: true, maxAge: exp - Date.now() / 1000 },
    });

    // remove state cookie as it was temporary
    removeCookie(req, res, authConfig.oidcStateCookie);

    res.redirect(originalURL);
  }

  async logoutHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const refreshToken = this.getRefreshToken(req);
    if (refreshToken) {
      // endSessionUrl revokes refresh session but we should remove our cookie
      this.client.revoke(refreshToken);
      removeCookie(req, res, authConfig.refreshTokenCookie);
    }

    const endSessionUrl = this.client.endSessionUrl({
      post_logout_redirect_uri: this.postLogoutRedirectUrl,
    });
    res.redirect(endSessionUrl);
  }
}
