// eslint-disable-next-line import/order
import mockAuthManager, { defaultMockToken } from '$service/auth/mocks/getAuthManager';
import _ from 'lodash';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import addJournalsToJournalGroup from '$pages/api/v1/journal-groups/[journalGroupId]/journals/bulk-insert';
import { roleSeparator } from '$service/groups/generateGroupId';

import { PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;

jest.mock('$service/generated/repoGqlTypes', () => ({
  getSdk: jest.fn(() => ({
    getItemsById: jest.fn((query) => {
      const [one, two] = query.query.bool.must[1].terms._id;
      if (one === '1' && two === '2') {
        return {
          search: {
            total: 2,
            items: [{ _id: '1' }, { _id: '2' }],
          },
        };
      } else if (one === '1') {
        return {
          search: {
            total: 1,
            items: [{ _id: '1' }],
          },
        };
      } else {
        return {
          search: {
            total: 0,
            items: [],
          },
        };
      }
    }),
  })),
}));

describe('add journals membership api', () => {
  beforeAll(async () => {
    prisma = await getBackendPrisma();
  });

  beforeEach(() => {
    mockAuthManager({
      ...defaultMockToken,
      roles: [`SystemAdmin${roleSeparator}12`],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should error on not provided inputs', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await addJournalsToJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error on empty journalIds', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        journalGroupId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        journalIds: [],
      },
    });

    await addJournalsToJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error when the user is not the SystemAdmin', async () => {
    mockAuthManager();

    const { req, res } = createMocks({
      method: 'POST',
      query: {
        journalGroupId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        journalIds: ['2'],
      },
    });

    await addJournalsToJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);
  });

  it('should error when such journal does not exist in repository and such journal group in database', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        journalGroupId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        journalIds: ['2'],
      },
    });

    await addJournalsToJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('Not Found');
    expect(res._getJSONData().extensions).toHaveLength(2);
  });

  it('should error when such journal group does not exist', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        journalGroupId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        journalIds: ['1'],
      },
    });

    await addJournalsToJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('Not Found');
    expect(res._getJSONData().extensions).toHaveLength(1);
  });

  it('should error when such journal does not exist in repository', async () => {
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
      method: 'POST',
      query: {
        journalGroupId: createdJournalGroup.id,
      },
      body: {
        journalIds: ['2'],
      },
    });

    await addJournalsToJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('Not Found');
    expect(res._getJSONData().extensions).toHaveLength(1);

    await prisma.journalGroup.delete({
      where: {
        id: createdJournalGroup.id,
      },
    });
  });

  it('should add one journal membership and update journalsCount and return these data(without batchId)', async () => {
    const journalIds = ['1'];
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
      method: 'POST',
      query: {
        journalGroupId: createdJournalGroup.id,
      },
      body: {
        journalIds,
      },
    });

    await addJournalsToJournalGroup(req as any, res as any);

    const updatedJournalGroup = await prisma.journalGroup.findUnique({
      where: {
        id: createdJournalGroup.id,
      },
    });

    const addedJournals = await prisma.journalsOfJournalGroup.findMany({
      where: {
        journalGroupId: createdJournalGroup.id,
        OR: journalIds.map((journalId) => ({ journalId })),
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().journalGroup.id).toBe(createdJournalGroup.id);
    expect(res._getJSONData().journalGroup.journalsCount).toBe(journalIds.length);
    expect(res._getJSONData().additionCount).toBe(journalIds.length);
    expect(addedJournals).toHaveLength(journalIds.length);
    _.forEach(addedJournals, (addedJournal) => {
      expect(journalIds).toContain(addedJournal.journalId);
      expect(addedJournal.assignedBy).toBe('test');
      expect(addedJournal.journalGroupId).toBe(createdJournalGroup.id);
    });
    expect(updatedJournalGroup!.journalsCount).toBe(journalIds.length);

    await prisma.journalsOfJournalGroup.deleteMany({
      where: {
        journalGroupId: createdJournalGroup.id,
        OR: journalIds.map((journalId) => ({ journalId })),
      },
    });
    await prisma.journalGroup.delete({
      where: {
        id: createdJournalGroup.id,
      },
    });
  });

  it('should add more than one journal membership and update journalsCount and return these data(with batchId)', async () => {
    const journalIds = ['1', '2'];
    const batchId = '123e4567-e89b-12d3-a456-426614174000';
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
      method: 'POST',
      query: {
        journalGroupId: createdJournalGroup.id,
      },
      body: {
        journalIds,
        batchId,
      },
    });

    await addJournalsToJournalGroup(req as any, res as any);

    const updatedJournalGroup = await prisma.journalGroup.findUnique({
      where: {
        id: createdJournalGroup.id,
      },
    });

    const addedJournals = await prisma.journalsOfJournalGroup.findMany({
      where: {
        journalGroupId: createdJournalGroup.id,
        OR: journalIds.map((journalId) => ({ journalId })),
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().journalGroup.id).toBe(createdJournalGroup.id);
    expect(res._getJSONData().journalGroup.journalsCount).toBe(journalIds.length);
    expect(res._getJSONData().additionCount).toBe(journalIds.length);
    expect(addedJournals).toHaveLength(journalIds.length);
    _.forEach(addedJournals, (addedJournal) => {
      expect(journalIds).toContain(addedJournal.journalId);
      expect(addedJournal.assignedBy).toBe('test');
      expect(addedJournal.journalGroupId).toBe(createdJournalGroup.id);
      expect(addedJournal.batchId).toBe(batchId);
    });
    expect(updatedJournalGroup!.journalsCount).toBe(journalIds.length);

    await prisma.journalsOfJournalGroup.deleteMany({
      where: {
        journalGroupId: createdJournalGroup.id,
        OR: journalIds.map((journalId) => ({ journalId })),
      },
    });
    await prisma.journalGroup.delete({
      where: {
        id: createdJournalGroup.id,
      },
    });
  });
});
