import { ExtendedToken } from './Token';

export const isAdmin = (userToken: ExtendedToken): boolean => {
  const tokenRolesSplitted = userToken.roles;
  return tokenRolesSplitted.SystemAdmin !== undefined;
};
