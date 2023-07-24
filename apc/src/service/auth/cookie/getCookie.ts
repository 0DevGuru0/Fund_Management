import { NextApiRequest } from 'next';

export const getCookie = (req: NextApiRequest, cookieKey: string): string | undefined =>
  req.cookies[cookieKey];
