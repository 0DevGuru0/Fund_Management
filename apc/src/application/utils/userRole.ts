import { useUserInfo } from '$application/lib/auth/useUserInfo';

export interface GetRoleResult {
  role:
    | 'SystemAdmin'
    | 'Researcher'
    | 'FundManager'
    | 'PublisherAdmin'
    | 'FundFinancialManager';
}

export const getUserRole = (): GetRoleResult => {
  const { roles } = useUserInfo();
  let result: GetRoleResult = {
    role: 'Researcher',
  };

  if (
    roles.PublisherAdmin &&
    roles.PublisherAdmin[0] &&
    roles.PublisherAdmin[0] === 'default'
  ) {
    result = {
      role: 'PublisherAdmin',
    };
  }

  if (
    roles.FundFinancialManager &&
    roles.FundFinancialManager[0] &&
    roles.FundFinancialManager[0] === 'default'
  ) {
    result = {
      role: 'FundFinancialManager',
    };
  }

  if (roles.FundManager && roles.FundManager[0] && roles.FundManager[0] === 'default') {
    result = {
      role: 'FundManager',
    };
  }

  if (roles.SystemAdmin && roles.SystemAdmin[0] && roles.SystemAdmin[0] === 'default') {
    result = {
      role: 'SystemAdmin',
    };
  }

  return result;
};
