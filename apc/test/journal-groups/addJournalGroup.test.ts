// eslint-disable-next-line import/order
import mockAuthManager, { defaultMockToken } from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import { roleSeparator } from '$service/groups/generateGroupId';
import addJournalGroup from '$service/journalGroups/api/addJournalGroupApi';

import { PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;
const validFundId = '1';
const validPublisherId = '2';

jest.mock('$service/generated/repoGqlTypes', () => ({
  getSdk: jest.fn(() => ({
    getAllOrganizations: jest.fn((query) => {
      if (
        query.query.bool.must[1].terms._id[0] === validFundId &&
        query.query.bool.must[2].match['Organization.type'] === 'Fund'
      ) {
        return {
          search: {
            items: [{ _id: validFundId, title: 'AI' }],
          },
        };
      } else if (
        query.query.bool.must[1].terms._id[0] === validPublisherId &&
        query.query.bool.must[2].match['Organization.type'] === 'Publisher'
      ) {
        return {
          search: {
            items: [{ _id: validPublisherId, title: 'AI' }],
          },
        };
      } else {
        return {
          search: {
            items: [],
          },
        };
      }
    }),
  })),
}));

describe('add journal group api', () => {
  beforeAll(async () => {
    prisma = await getBackendPrisma();
  });

  beforeEach(() => {
    // default with SystemAdmin
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

    await addJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error when the user has no role', async () => {
    mockAuthManager();

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fundId: '3',
        publisherId: '4',
        title: 'abc',
      },
    });

    await addJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);
  });

  it('should error when roles does not have any fund manager role', async () => {
    mockAuthManager({
      ...defaultMockToken,
      roles: [`Researcher${roleSeparator}12`],
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fundId: '3',
        publisherId: '4',
        title: 'abc',
      },
    });

    await addJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);
  });

  it('should error when roles does not have any fund manager for provided fundId', async () => {
    mockAuthManager({
      ...defaultMockToken,
      roles: [`FundManager${roleSeparator}12`],
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fundId: '3',
        publisherId: '4',
        title: 'abc',
      },
    });

    await addJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);
  });

  it('should error when such fund and publisher does not exist', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fundId: '3',
        publisherId: '4',
        title: 'abc',
      },
    });

    await addJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('Not Found');
    expect(res._getJSONData().extensions).toHaveLength(2);
  });

  it('should error when such fund does not exist', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fundId: '3',
        publisherId: validPublisherId,
        title: 'abc',
      },
    });

    await addJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('Not Found');
    expect(res._getJSONData().extensions).toHaveLength(1);
  });

  it('should error when such publisher does not exist', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fundId: validFundId,
        publisherId: '4',
        title: 'abc',
      },
    });

    await addJournalGroup(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('Not Found');
    expect(res._getJSONData().extensions).toHaveLength(1);
  });

  it('should add journal group with provided data(with fund manager role)', async () => {
    mockAuthManager({
      ...defaultMockToken,
      roles: [`FundManager${roleSeparator}${validFundId}`],
    });
    const title = 'abc';
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fundId: validFundId,
        publisherId: validPublisherId,
        title,
      },
    });

    await addJournalGroup(req as any, res as any);

    const journalGroup = await prisma.journalGroup.findMany({
      where: {
        fundId: validFundId,
        publisherId: validPublisherId,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().fundId).toBe(validFundId);
    expect(res._getJSONData().publisherId).toBe(validPublisherId);
    expect(res._getJSONData().title).toBe(title);
    expect(res._getJSONData().createdBy).toBe('test');
    expect(journalGroup).toHaveLength(1);
    expect(res._getJSONData().id).toBe(journalGroup[0].id);

    await prisma.journalGroup.delete({
      where: {
        id: journalGroup[0].id,
      },
    });
  });

  it('should add journal group with provided data(with system admin role)', async () => {
    const title = 'abc';
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fundId: validFundId,
        publisherId: validPublisherId,
        title,
      },
    });

    await addJournalGroup(req as any, res as any);

    const journalGroup = await prisma.journalGroup.findMany({
      where: {
        fundId: validFundId,
        publisherId: validPublisherId,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().fundId).toBe(validFundId);
    expect(res._getJSONData().publisherId).toBe(validPublisherId);
    expect(res._getJSONData().title).toBe(title);
    expect(res._getJSONData().createdBy).toBe('test');
    expect(journalGroup).toHaveLength(1);
    expect(res._getJSONData().id).toBe(journalGroup[0].id);

    await prisma.journalGroup.delete({
      where: {
        id: journalGroup[0].id,
      },
    });
  });
});
