import { map } from 'lodash';

import { Role } from '$service/groups/Role';

import { generateGroupId } from '../../src/service/groups/generateGroupId';

import { seedClient } from './helpers/seedClient';

export const funds = {
  stdf: {
    id: '610f0e3f0023940006e0dc9b',
    shortName: 'STDF',
  },
  test: {
    id: '6119d1536a1eba00075b16a2',
    shortName: 'TestFund',
  },
} as const;

export const getGroupIdInFund = (
  role: keyof typeof Role,
  fundKey: keyof typeof funds,
): string => generateGroupId({ type: role, organizationId: funds[fundKey].id });

export const createFundGroups = async (): Promise<void> => {
  const promises = map(funds, ({ id, shortName }) => [
    // Fund Manager for each fund
    seedClient
      .post('group/create', {
        json: {
          id: `FundManager${id}`,
          name: `${shortName} Fund Manager`,
          type: 'FundManager',
        },
      })
      .json(),
    // Fund Finance Manager for each fund
    seedClient
      .post('group/create', {
        json: {
          id: `FundFinancialManager${id}`,
          name: `${shortName} Fund Finance Manager`,
          type: 'FundFinancialManager',
        },
      })
      .json(),
  ])
    .flat()
    .concat(
      // Adds system admin group
      seedClient
        .post('group/create', {
          json: {
            id: `SystemAdmin`,
            name: `System Administrator`,
            type: 'SystemAdmin',
          },
        })
        .json(),
    );

  // We ignore failures here which all are duplicate key errors (if we've already ran this)
  await Promise.allSettled(promises).catch();

  console.info('Successfully Created Groups');
};
