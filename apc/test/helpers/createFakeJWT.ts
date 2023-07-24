import { KeyCloakToken } from '$service/auth/Token';

export const createFakeJWT = (tokenInfo: KeyCloakToken): string => {
  const headerBase64 = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString(
    'base64',
  );
  const tokenInfoBase64 = Buffer.from(JSON.stringify(tokenInfo)).toString('base64');
  return `${headerBase64}.${tokenInfoBase64}.123abcdefgnAGmr12`;
};
