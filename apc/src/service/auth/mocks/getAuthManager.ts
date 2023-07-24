import { KeyCloakToken } from '$service/auth/Token';

import * as getAuthManager from '../getAuthManager';

jest.mock('$service/auth/getAuthManager', () => ({
  getAuthManager: jest.fn(),
}));

const mockedTypeGetAuthManager = getAuthManager as jest.Mocked<typeof getAuthManager>;

export const defaultMockToken: KeyCloakToken = {
  exp: Date.now() / 1000 + 3600,
  iat: Date.now() / 1000 - 60,
  sub: 'test@iknito.com',
  given_name: 'test',
  family_name: 'test',
  gender: 'test',
  picture: 'test',
  email: 'test@iknito.com',
  email_verified: true,
  preferred_username: 'test',
};

export default (accessToken: KeyCloakToken = defaultMockToken): void => {
  mockedTypeGetAuthManager.getAuthManager.mockImplementation(
    () =>
      ({
        verifyAndDecodeAccessToken: () => accessToken,
      } as any),
  );
};
