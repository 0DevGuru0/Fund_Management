import { defaultMockToken } from '$service/auth/mocks/getAuthManager';

import { roleSeparator } from './generateGroupId';
import { getTokenRolesSplitted } from './getTokenRolesSplitted';

describe('get token roles splitted', () => {
  it('should return empty object for undefined roles', async () => {
    const splittedRoles = getTokenRolesSplitted(defaultMockToken);

    expect(splittedRoles).toBeDeepEqual({});
  });

  it('should return empty object for empty roles', async () => {
    const splittedRoles = getTokenRolesSplitted({ ...defaultMockToken, roles: [] });

    expect(splittedRoles).toBeDeepEqual({});
  });

  it('should return default value when there is no organization id for a role title', async () => {
    const splittedRoles = getTokenRolesSplitted({
      ...defaultMockToken,
      roles: [`SystemAdmin${roleSeparator}`],
    });

    expect(splittedRoles).toBeDeepEqual({ SystemAdmin: ['default'] });
  });

  it('should return all roles splitted', async () => {
    const systemAdminOrganizationId = '123';
    const fundManagerOrganizationId1 = '234';
    const fundManagerOrganizationId2 = '345';

    const splittedRoles = getTokenRolesSplitted({
      ...defaultMockToken,
      roles: [
        `SystemAdmin${roleSeparator}${systemAdminOrganizationId}`,
        `SystemAdmin${roleSeparator}`,
        `FundManager${roleSeparator}${fundManagerOrganizationId1}`,
        `FundManager${roleSeparator}${fundManagerOrganizationId2}`,
      ],
    });

    expect(splittedRoles).toBeDeepEqual({
      SystemAdmin: [systemAdminOrganizationId, 'default'],
      FundManager: [fundManagerOrganizationId1, fundManagerOrganizationId2],
    });
  });
});
