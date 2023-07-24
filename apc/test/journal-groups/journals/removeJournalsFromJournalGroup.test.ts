// eslint-disable-next-line import/order
import mockAuthManager, { defaultMockToken } from '$service/auth/mocks/getAuthManager';
import _ from 'lodash';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import removeJournalsFromJournalGroup from '$pages/api/v1/journal-groups/[journalGroupId]/journals/bulk-delete';
import { roleSeparator } from '$service/groups/generateGroupId';

import { PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;

describe('remove journals membership api', () => {
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

    await removeJournalsFromJournalGroup(req as any, res as any);

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

    await removeJournalsFromJournalGroup(req as any, res as any);

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
        journalIds: ['1'],
      },
    });

    await removeJournalsFromJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);
  });

  it('should error when the only provided membership does not exist', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        journalGroupId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        journalIds: ['1'],
      },
    });

    await removeJournalsFromJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe(
      'some of the provided journals are not members of the journalGroup',
    );
  });

  it('should error when none of the provided memberships exists', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        journalGroupId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        journalIds: ['1', '2'],
      },
    });

    await removeJournalsFromJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe(
      'some of the provided journals are not members of the journalGroup',
    );
  });

  it('should error when some of the provided memberships does not exist', async () => {
    const createdJournalGroup = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: 'abc',
        createdBy: 'abc',
        journalsCount: 1,
      },
    });
    const createdJournalsOfJournalGroup = await prisma.journalsOfJournalGroup.create({
      data: {
        journalId: '1',
        batchId: '123e4567-e89b-12d3-a456-426614174000',
        assignedBy: 'abc',
        journalGroupId: createdJournalGroup.id,
      },
    });

    const { req, res } = createMocks({
      method: 'POST',
      query: {
        journalGroupId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        journalIds: ['1', '2'],
      },
    });

    await removeJournalsFromJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe(
      'some of the provided journals are not members of the journalGroup',
    );

    await prisma.journalsOfJournalGroup.delete({
      where: {
        journalGroupId_journalId: {
          journalGroupId: createdJournalsOfJournalGroup.journalGroupId,
          journalId: createdJournalsOfJournalGroup.journalId,
        },
      },
    });
    await prisma.journalGroup.delete({
      where: {
        id: createdJournalGroup?.id,
      },
    });
  });

  it('should remove the only provided journal membership and update journalsCount and return these data', async () => {
    const journalIds = ['123'];
    const excessJournalIds = [];
    const createdJournalGroup = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: 'abc',
        createdBy: 'abc',
        journalsCount: journalIds.length + excessJournalIds.length,
      },
    });
    await prisma.journalsOfJournalGroup.createMany({
      data: [
        ...journalIds.map((journalId) => ({
          journalId,
          batchId: '123e4567-e89b-12d3-a456-426614174000',
          assignedBy: 'abc',
          journalGroupId: createdJournalGroup.id,
        })),
        ...excessJournalIds.map((journalId) => ({
          journalId,
          batchId: '123e4567-e89b-12d3-a456-426614174000',
          assignedBy: 'abc',
          journalGroupId: createdJournalGroup.id,
        })),
      ],
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

    await removeJournalsFromJournalGroup(req as any, res as any);

    const updatedJournalGroup = await prisma.journalGroup.findUnique({
      where: {
        id: createdJournalGroup.id,
      },
    });

    const remainingJournals = await prisma.journalsOfJournalGroup.findMany({
      where: {
        journalGroupId: createdJournalGroup.id,
        OR: [
          ...journalIds.map((journalId) => ({
            journalId,
          })),
          ...excessJournalIds.map((journalId) => ({
            journalId,
          })),
        ],
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().journalGroup.id).toBe(createdJournalGroup.id);
    expect(res._getJSONData().journalGroup.journalsCount).toBe(excessJournalIds.length);
    expect(res._getJSONData().deletionCount).toBe(journalIds.length);
    expect(updatedJournalGroup!.journalsCount).toBe(excessJournalIds.length);
    expect(remainingJournals).toHaveLength(excessJournalIds.length);
    _.forEach(remainingJournals, (remainingJournal) => {
      expect(excessJournalIds).toContain(remainingJournal.journalId);
    });

    await prisma.journalsOfJournalGroup.deleteMany({
      where: {
        journalGroupId: createdJournalGroup.id,
        OR: [
          ...excessJournalIds.map((journalId) => ({
            journalId,
          })),
        ],
      },
    });
    await prisma.journalGroup.delete({
      where: {
        id: createdJournalGroup?.id,
      },
    });
  });

  it('should remove the provided journal membership and update journalsCount and return these data', async () => {
    const journalIds = ['123'];
    const excessJournalIds = ['234'];
    const createdJournalGroup = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: 'abc',
        createdBy: 'abc',
        journalsCount: journalIds.length + excessJournalIds.length,
      },
    });
    await prisma.journalsOfJournalGroup.createMany({
      data: [
        ...journalIds.map((journalId) => ({
          journalId,
          batchId: '123e4567-e89b-12d3-a456-426614174000',
          assignedBy: 'abc',
          journalGroupId: createdJournalGroup.id,
        })),
        ...excessJournalIds.map((journalId) => ({
          journalId,
          batchId: '123e4567-e89b-12d3-a456-426614174000',
          assignedBy: 'abc',
          journalGroupId: createdJournalGroup.id,
        })),
      ],
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

    await removeJournalsFromJournalGroup(req as any, res as any);

    const updatedJournalGroup = await prisma.journalGroup.findUnique({
      where: {
        id: createdJournalGroup.id,
      },
    });

    const remainingJournals = await prisma.journalsOfJournalGroup.findMany({
      where: {
        journalGroupId: createdJournalGroup.id,
        OR: [
          ...journalIds.map((journalId) => ({
            journalId,
          })),
          ...excessJournalIds.map((journalId) => ({
            journalId,
          })),
        ],
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().journalGroup.id).toBe(createdJournalGroup.id);
    expect(res._getJSONData().journalGroup.journalsCount).toBe(excessJournalIds.length);
    expect(res._getJSONData().deletionCount).toBe(journalIds.length);
    expect(updatedJournalGroup!.journalsCount).toBe(excessJournalIds.length);
    expect(remainingJournals).toHaveLength(excessJournalIds.length);
    _.forEach(remainingJournals, (remainingJournal) => {
      expect(excessJournalIds).toContain(remainingJournal.journalId);
    });

    await prisma.journalsOfJournalGroup.deleteMany({
      where: {
        journalGroupId: createdJournalGroup.id,
        OR: [
          ...excessJournalIds.map((journalId) => ({
            journalId,
          })),
        ],
      },
    });
    await prisma.journalGroup.delete({
      where: {
        id: createdJournalGroup?.id,
      },
    });
  });

  it('should remove all of the journal memberships and update journalsCount and return these data', async () => {
    const journalIds = ['123', '234'];
    const excessJournalIds = [];
    const createdJournalGroup = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: 'abc',
        createdBy: 'abc',
        journalsCount: journalIds.length + excessJournalIds.length,
      },
    });
    await prisma.journalsOfJournalGroup.createMany({
      data: [
        ...journalIds.map((journalId) => ({
          journalId,
          batchId: '123e4567-e89b-12d3-a456-426614174000',
          assignedBy: 'abc',
          journalGroupId: createdJournalGroup.id,
        })),
        ...excessJournalIds.map((journalId) => ({
          journalId,
          batchId: '123e4567-e89b-12d3-a456-426614174000',
          assignedBy: 'abc',
          journalGroupId: createdJournalGroup.id,
        })),
      ],
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

    await removeJournalsFromJournalGroup(req as any, res as any);

    const updatedJournalGroup = await prisma.journalGroup.findUnique({
      where: {
        id: createdJournalGroup.id,
      },
    });

    const remainingJournals = await prisma.journalsOfJournalGroup.findMany({
      where: {
        journalGroupId: createdJournalGroup.id,
        OR: [
          ...journalIds.map((journalId) => ({
            journalId,
          })),
          ...excessJournalIds.map((journalId) => ({
            journalId,
          })),
        ],
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().journalGroup.id).toBe(createdJournalGroup.id);
    expect(res._getJSONData().journalGroup.journalsCount).toBe(excessJournalIds.length);
    expect(res._getJSONData().deletionCount).toBe(journalIds.length);
    expect(updatedJournalGroup!.journalsCount).toBe(excessJournalIds.length);
    expect(remainingJournals).toHaveLength(excessJournalIds.length);
    _.forEach(remainingJournals, (remainingJournal) => {
      expect(excessJournalIds).toContain(remainingJournal.journalId);
    });

    await prisma.journalsOfJournalGroup.deleteMany({
      where: {
        journalGroupId: createdJournalGroup.id,
        OR: [
          ...excessJournalIds.map((journalId) => ({
            journalId,
          })),
        ],
      },
    });
    await prisma.journalGroup.delete({
      where: {
        id: createdJournalGroup?.id,
      },
    });
  });

  it('should remove all of the provided journal memberships and update journalsCount and return these data', async () => {
    const journalIds = ['123', '234'];
    const excessJournalIds = ['345'];
    const createdJournalGroup = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: 'abc',
        createdBy: 'abc',
        journalsCount: journalIds.length + excessJournalIds.length,
      },
    });
    await prisma.journalsOfJournalGroup.createMany({
      data: [
        ...journalIds.map((journalId) => ({
          journalId,
          batchId: '123e4567-e89b-12d3-a456-426614174000',
          assignedBy: 'abc',
          journalGroupId: createdJournalGroup.id,
        })),
        ...excessJournalIds.map((journalId) => ({
          journalId,
          batchId: '123e4567-e89b-12d3-a456-426614174000',
          assignedBy: 'abc',
          journalGroupId: createdJournalGroup.id,
        })),
      ],
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

    await removeJournalsFromJournalGroup(req as any, res as any);

    const updatedJournalGroup = await prisma.journalGroup.findUnique({
      where: {
        id: createdJournalGroup.id,
      },
    });

    const remainingJournals = await prisma.journalsOfJournalGroup.findMany({
      where: {
        journalGroupId: createdJournalGroup.id,
        OR: [
          ...journalIds.map((journalId) => ({
            journalId,
          })),
          ...excessJournalIds.map((journalId) => ({
            journalId,
          })),
        ],
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().journalGroup.id).toBe(createdJournalGroup.id);
    expect(res._getJSONData().journalGroup.journalsCount).toBe(excessJournalIds.length);
    expect(res._getJSONData().deletionCount).toBe(journalIds.length);
    expect(updatedJournalGroup!.journalsCount).toBe(excessJournalIds.length);
    expect(remainingJournals).toHaveLength(excessJournalIds.length);
    _.forEach(remainingJournals, (remainingJournal) => {
      expect(excessJournalIds).toContain(remainingJournal.journalId);
    });

    await prisma.journalsOfJournalGroup.deleteMany({
      where: {
        journalGroupId: createdJournalGroup.id,
        OR: [
          ...excessJournalIds.map((journalId) => ({
            journalId,
          })),
        ],
      },
    });
    await prisma.journalGroup.delete({
      where: {
        id: createdJournalGroup?.id,
      },
    });
  });
});
