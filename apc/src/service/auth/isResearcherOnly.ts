import { TitleOrganization } from '$service/groups/getTokenRolesSplitted';

export const isResearcherOnly = (roles: TitleOrganization): boolean => {
  return roles.Researcher !== undefined && Object.keys(roles).length === 1;
};
