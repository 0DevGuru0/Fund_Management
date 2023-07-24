import { ExtendedToken } from './Token';

export const isHimself = (userToken: ExtendedToken, username: string): boolean => {
  return userToken.preferred_username === username;
};
