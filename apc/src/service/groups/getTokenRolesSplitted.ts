import { roleSeparator } from './generateGroupId';
import { Role } from './Role';

export type TitleOrganization = Partial<Record<Role, string[]>>;

interface MinimalKeyCloakToken {
  roles?: string[];
}

export const getTokenRolesSplitted = (
  userToken?: MinimalKeyCloakToken,
): TitleOrganization => {
  const result: TitleOrganization = {};
  const roles = userToken?.roles;
  if (!roles) {
    return {};
  }
  for (const role of roles) {
    const [roleTitle, organizationId] = role.split(roleSeparator);
    if (!result[roleTitle]) {
      result[roleTitle] = [];
    }
    result[roleTitle].push(organizationId || 'default');
  }
  return result;
};
