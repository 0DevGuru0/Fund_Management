import { intersection } from 'lodash';

import { ExtendedToken } from '$service/auth/Token';
import { ForbiddenError } from '$service/errors';
import { Role } from '$service/groups/Role';

export const checkRoleRestriction = (
  userToken: ExtendedToken,
  optionRoles?: Role[],
): void => {
  if (!optionRoles || optionRoles.length === 0) {
    return;
  }
  const tokenRolesSplitted = userToken.roles;
  const tokenRolesTitle = Object.keys(tokenRolesSplitted);
  const eligibleRoles = intersection(optionRoles, tokenRolesTitle);
  if (eligibleRoles.length === 0) {
    throw new ForbiddenError();
  }
};
