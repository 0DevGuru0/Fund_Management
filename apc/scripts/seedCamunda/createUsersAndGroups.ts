import { createFundGroups, getGroupIdInFund } from './createGroups';
import { seedClient } from './helpers/seedClient';

const users = [
  {
    id: 'admin',
    firstName: 'John',
    lastName: 'Admin',
    email: 'admin@devknito.com',
    groups: ['SystemAdmin'],
  },
  {
    id: 'researcher1',
    firstName: 'Jack',
    lastName: 'Researcher 1',
    email: 'researcher1@devknito.com',
  },
  {
    id: 'researcher2',
    firstName: 'Joe',
    lastName: 'Researcher 2',
    email: 'researcher2@devknito.com',
  },
  {
    id: 'researcher3',
    firstName: 'Johnathan',
    lastName: 'Researcher 3',
    email: 'researcher3@devknito.com',
  },
  {
    id: 'fundmanager1',
    firstName: 'Fred',
    lastName: 'Fund Manager 1',
    email: 'fundmanager1@devknito.com',
    groups: [getGroupIdInFund('FundManager', 'stdf')],
  },
  {
    id: 'fundmanager2',
    firstName: 'Ferdinand',
    lastName: 'Fund Manager 2',
    email: 'fundmanager2@devknito.com',
    groups: [getGroupIdInFund('FundManager', 'test')],
  },
  {
    id: 'fundmanager3',
    firstName: 'Fernando',
    lastName: 'Fund Manager 3',
    email: 'fundmanager3@devknito.com',
    funds: [
      getGroupIdInFund('FundManager', 'stdf'),
      getGroupIdInFund('FundManager', 'test'),
    ],
  },
  {
    id: 'fundfinancemanager1',
    firstName: 'Fine',
    lastName: 'Finance Manager 1',
    email: 'finance1@devknito.com',
    groups: [getGroupIdInFund('FundFinancialManager', 'stdf')],
  },
  {
    id: 'fundfinancemanager2',
    firstName: 'Frank',
    lastName: 'Finance Manager 2',
    email: 'finance2@devknito.com',
    groups: [getGroupIdInFund('FundFinancialManager', 'test')],
  },
  {
    id: 'fundfinancemanager3',
    firstName: 'Franky',
    lastName: 'Finance Manager 3',
    email: 'finance3@devknito.com',
    groups: [
      getGroupIdInFund('FundFinancialManager', 'stdf'),
      getGroupIdInFund('FundFinancialManager', 'test'),
    ],
  },
];

export const createUsersAndGroups = async (): Promise<void> => {
  await createFundGroups();

  const userPromises = users.map((user) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { groups, ...profile } = user;

    // create the user
    return seedClient
      .post('user/create', {
        json: {
          profile,
          credentials: {
            password: '123',
          },
        },
      })
      .json();
  });

  await Promise.allSettled(userPromises).catch();

  const membershipPromises = users
    .map((user) => {
      const { id, groups } = user;
      return (groups ?? []).map((groupId) =>
        seedClient.put(`group/${groupId}/members/${id}`).json(),
      );
    })
    .flat();

  // We ignore failures here which all are duplicate key errors (if we've already ran this)
  await Promise.allSettled(membershipPromises).catch();

  console.info('Successfully Created Users');
};
