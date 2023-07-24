import { serialize, CookieSerializeOptions } from 'cookie';
import { NextApiResponse } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

interface Cookie {
  name: string;
  value: any;
  options: CookieSerializeOptions;
}

const defaultAge = 60 * 5;

export const setCookie = (res: NextApiResponse, cookieData: Cookie): any => {
  const { name, value, options } = cookieData;

  if (!value) {
    throw new Error('no value is provided for the cookie');
  }

  options.path = '/';
  options.secure = isProduction;

  // this is caluclated in seconds
  options.maxAge = options.maxAge ? Math.floor(options.maxAge) : defaultAge; // 5 mins default cookie age

  // expires is older (but supported by IE <= 9) so we add it to be safe
  options.expires = new Date(Date.now() + options.maxAge * 1000);

  // this is to support multiple set cookies in a request
  let prevHeader = res.getHeader('Set-Cookie');
  if (!prevHeader) {
    prevHeader = [];
  }
  if (Array.isArray(prevHeader)) {
    prevHeader = [...prevHeader];
  }

  res.setHeader('Set-Cookie', [
    ...(prevHeader as any[]),
    serialize(name, String(value), options),
  ]);
};
