// eslint-disable-next-line import/order
import mockAuthManager from '$service/auth/mocks/getAuthManager';
import { min } from 'lodash';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import getJournalGroup from '$service/journalGroups/api/getJournalGroupsApi';

import { journalGroupsData } from './getJournalGroups.data';

import { PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;

describe('get journal groups api', () => {
  beforeAll(async () => {
    mockAuthManager();

    prisma = await getBackendPrisma();
    const createPromises = journalGroupsData.map(({ group, journals }) =>
      prisma.journalGroup.create({
        data: {
          ...group,
          journals: {
            createMany: {
              data: journals.map((journalId) => ({
                journalId,
                batchId: '123e4567-e89b-12d3-a456-426614174000',
                assignedBy: 'abc',
              })),
            },
          },
        },
      }),
    );

    await Promise.all(createPromises);
  });

  afterEach(() => {
    prisma.journalGroup.deleteMany();
    jest.clearAllMocks();
  });

  it("should return all journal groups with their latest journals' id", async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await getJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    const queryResult = res._getJSONData();
    expect(queryResult).toBeArray();
    expect(queryResult).toHaveLength(journalGroupsData.length);
    expect(queryResult.map(({ title }) => title)).toIncludeSameMembers(
      journalGroupsData.map(({ group }) => group.title),
    );

    journalGroupsData.forEach(({ group, journals }) => {
      const resultJournalGroup = queryResult.find(({ title }) => title === group.title);
      expect(resultJournalGroup.journals).toHaveLength(min([journals.length, 10])!);
    });
  });

  it('should filter journal groups by publisher id', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        publisherId: 'Elsevier',
      },
    });

    await getJournalGroup(req as any, res as any);
    expect(res._getStatusCode()).toBe(200);
    const queryResult = res._getJSONData();

    expect(
      queryResult.filter(({ publisherId }) => publisherId === 'Elsevier'),
    ).toHaveLength(2);
  });
});
