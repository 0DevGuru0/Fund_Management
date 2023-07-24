import { ExtendedToken } from './Token';

export const getFundRoleOrganizations = (userToken: ExtendedToken): string[] => {
  const tokenRolesSplitted = userToken.roles;
  const tokenRolesFundOrganizations = [
    ...(tokenRolesSplitted.FundManager ?? []),
    ...(tokenRolesSplitted.FundFinancialManager ?? []),
  ];
  return tokenRolesFundOrganizations;
};
