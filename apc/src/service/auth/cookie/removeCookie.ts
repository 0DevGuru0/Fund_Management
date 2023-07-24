import { NextApiRequest, NextApiResponse } from 'next';

import { getCookie } from './getCookie';
import { setCookie } from './setCookie';

export const removeCookie = (
  req: NextApiRequest,
  res: NextApiResponse,
  cookieKey: string,
): string | undefined => {
  const cookie = getCookie(req, cookieKey);
  setCookie(res, { name: cookieKey, value: 'REMOVED', options: { maxAge: -1000 } });

  return cookie;
};
