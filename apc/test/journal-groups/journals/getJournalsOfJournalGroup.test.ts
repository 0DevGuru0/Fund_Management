// eslint-disable-next-line import/order
import mockAuthManager from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import getJournalsOfJournalGroup from '$pages/api/v1/journal-groups/[journalGroupId]/journals';

import { PrismaClient } from '.prisma/backend-client';

jest.mock('$service/generated/repoGqlTypes', () => ({
  getSdk: jest.fn(() => ({
    getAllJournals: jest.fn((query) => ({
      search: {
        items: query.query.bool.must[1].terms._id.map((id) => ({
          title: 'abc',
          parentId: 'abc',
          publisher: {
            title: 'gooood publisher',
          },
          _id: id,
          createdAt: 'abc',
          updatedAt: 'abc',
          isCollection: true,
          subjects: ['abc'],
          apc: true,
          keywords: ['abc'],
          languages: ['abc'],
        })),
      },
    })),
  })),
}));

let prisma: PrismaClient;

describe('getJournalsOfJournalGroup api', () => {
  beforeAll(async () => {
    mockAuthManager();

    prisma = await getBackendPrisma();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should error on not provided journalGroupId', async () => {
    const { req, res } = createMocks({});

    await getJournalsOfJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should return empty when there is no such journalGroup', async () => {
    const { req, res } = createMocks({
      query: {
        journalGroupId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });

    await getJournalsOfJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBeObject();
    expect(res._getJSONData().count).toBe(0);
  });

  it('should return empty when there is no journal for this journalGroup', async () => {
    const createdJournalGroup = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: 'abc',
        createdBy: 'abc',
        journalsCount: 0,
      },
    });

    const { req, res } = createMocks({
      query: {
        journalGroupId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });

    await getJournalsOfJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBeObject();
    expect(res._getJSONData().count).toBe(0);

    await prisma.journalGroup.delete({
      where: {
        id: createdJournalGroup.id,
      },
    });
  });

  it('should return journals', async () => {
    const journalIds1 = ['3', '4', '5'];
    const journalGroup1 = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: 'abc',
        createdBy: 'abc',
        journalsCount: 1,
        journals: {
          createMany: {
            data: journalIds1.map((journalId1) => ({
              journalId: journalId1,
              batchId: '123e4567-e89b-12d3-a456-426614174000',
              assignedBy: 'abc',
            })),
          },
        },
      },
    });
    const journalIds2 = ['1', '2', '3'];
    const journalGroup2 = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: 'abc',
        createdBy: 'abc',
        journalsCount: 1,
        journals: {
          createMany: {
            data: journalIds2.map((journalId2) => ({
              journalId: journalId2,
              batchId: '123e4567-e89b-12d3-a456-426614174000',
              assignedBy: 'abc',
            })),
          },
        },
      },
    });

    const { req, res } = createMocks({
      query: {
        journalGroupId: journalGroup1.id,
      },
    });

    await getJournalsOfJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBeObject();
    expect(res._getJSONData().count).toBe(3);
    journalIds1.forEach((id) => {
      expect(res._getJSONData().journals.map((detail) => detail._id)).toContain(id);
    });

    await prisma.journalsOfJournalGroup.deleteMany({
      where: {
        journalGroupId: journalGroup1.id,
      },
    });
    await prisma.journalsOfJournalGroup.deleteMany({
      where: {
        journalGroupId: journalGroup2.id,
      },
    });
    await prisma.journalGroup.deleteMany({
      where: {
        OR: [
          {
            id: journalGroup1.id,
          },
          {
            id: journalGroup2.id,
          },
        ],
      },
    });
  });
});
