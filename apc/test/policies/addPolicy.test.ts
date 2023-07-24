// eslint-disable-next-line import/order
import mockAuthManager, { defaultMockToken } from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import { roleSeparator } from '$service/groups/generateGroupId';
import addPolicy from '$service/policies/api/createPolicyApi';

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

describe('add policy api', () => {
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

    await addPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error when invalid type provided', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        type: 'ABC',
        title: 'abc',
        fundId: '123',
        terms: 'abc',
        note: 'abc',
      },
    });

    await addPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error when type is VOUCHER and publisherId not provided', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        type: 'VOUCHER',
        title: 'abc',
        fundId: '123',
        terms: 'abc',
        note: 'abc',
      },
    });

    await addPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error when the user has no role', async () => {
    mockAuthManager();

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        type: 'INVOICE',
        title: 'abc',
        fundId: '3',
        terms: 'abc',
        note: 'abc',
      },
    });

    await addPolicy(req as any, res as any);

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
        type: 'INVOICE',
        title: 'abc',
        fundId: '3',
        terms: 'abc',
        note: 'abc',
      },
    });

    await addPolicy(req as any, res as any);

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
        type: 'INVOICE',
        title: 'abc',
        fundId: '3',
        terms: 'abc',
        note: 'abc',
      },
    });

    await addPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);
  });

  it('should error when such fund does not exist(without publisher)', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        type: 'INVOICE',
        title: 'abc',
        fundId: '3',
        terms: 'abc',
        note: 'abc',
      },
    });

    await addPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('Not Found');
    expect(res._getJSONData().extensions).toHaveLength(1);
  });

  it('should error when such fund and publisher does not exist', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        type: 'INVOICE',
        title: 'abc',
        fundId: '3',
        terms: 'abc',
        note: 'abc',
        publisherId: '4',
      },
    });

    await addPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('Not Found');
    expect(res._getJSONData().extensions).toHaveLength(2);
  });

  it('should error when such fund does not exist(with publisher)', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        type: 'INVOICE',
        title: 'abc',
        fundId: '3',
        terms: 'abc',
        note: 'abc',
        publisherId: validPublisherId,
      },
    });

    await addPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('Not Found');
    expect(res._getJSONData().extensions).toHaveLength(1);
  });

  it('should error when such publisher does not exist', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        type: 'INVOICE',
        title: 'abc',
        fundId: validFundId,
        terms: 'abc',
        note: 'abc',
        publisherId: '4',
      },
    });

    await addPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('Not Found');
    expect(res._getJSONData().extensions).toHaveLength(1);
  });

  it('should add policy (without isActive and publisher)(with fund manager role)', async () => {
    mockAuthManager({
      ...defaultMockToken,
      roles: [`FundManager${roleSeparator}${validFundId}`],
    });
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        type: 'INVOICE',
        title: 'abc',
        fundId: validFundId,
        terms: 'abc',
        note: 'abc',
      },
    });

    await addPolicy(req as any, res as any);

    const policy = await prisma.policy.findUnique({
      where: {
        id: res._getJSONData().id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().fundId).toBe(validFundId);
    expect(policy?.fundId).toBe(validFundId);
    expect(policy?.isActive).toBe(true);
    expect(policy?.publisherId).toBeNull();
    expect(policy?.createdBy).toBe('test');

    await prisma.policy.delete({
      where: {
        id: policy?.id,
      },
    });
  });

  it('should add policy (without isActive and publisher)(with system admin role)', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        type: 'INVOICE',
        title: 'abc',
        fundId: validFundId,
        terms: 'abc',
        note: 'abc',
      },
    });

    await addPolicy(req as any, res as any);

    const policy = await prisma.policy.findUnique({
      where: {
        id: res._getJSONData().id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().fundId).toBe(validFundId);
    expect(policy?.fundId).toBe(validFundId);
    expect(policy?.isActive).toBe(true);
    expect(policy?.publisherId).toBeNull();
    expect(policy?.createdBy).toBe('test');

    await prisma.policy.delete({
      where: {
        id: policy?.id,
      },
    });
  });

  it('should add policy (with just isActive and journalGroup relation)', async () => {
    const journalGroup1 = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: 'abc',
        createdBy: 'abc',
        journalsCount: 0,
      },
    });
    const journalGroup2 = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: 'abc',
        createdBy: 'abc',
        journalsCount: 0,
      },
    });
    const journalGroup3 = await prisma.journalGroup.create({
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
      body: {
        type: 'INVOICE',
        title: 'abc',
        fundId: validFundId,
        isActive: false,
        terms: 'abc',
        note: 'abc',
        journalGroupIds: [journalGroup1.id, journalGroup3.id],
      },
    });

    await addPolicy(req as any, res as any);

    const policy = await prisma.policy.findUnique({
      where: {
        id: res._getJSONData().id,
      },
    });
    const policyMemberships = await prisma.journalGroupsOfPolicy.findMany({});

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().fundId).toBe(validFundId);
    expect(policy?.fundId).toBe(validFundId);
    expect(policy?.isActive).toBe(false);
    expect(policy?.publisherId).toBeNull();
    expect(policy?.createdBy).toBe('test');
    expect(policyMemberships).toHaveLength(2);
    expect(
      policyMemberships.map((policyMembership) => policyMembership.journalGroupId),
    ).toContain(journalGroup1.id);
    expect(
      policyMemberships.map((policyMembership) => policyMembership.journalGroupId),
    ).toContain(journalGroup3.id);

    await prisma.journalGroupsOfPolicy.deleteMany({});
    await prisma.journalGroup.deleteMany({
      where: {
        OR: [
          {
            id: journalGroup1.id,
          },
          {
            id: journalGroup2.id,
          },
          {
            id: journalGroup3.id,
          },
        ],
      },
    });
    await prisma.policy.delete({
      where: {
        id: policy?.id,
      },
    });
  });

  it('should error when some of the provided journal groups publisherId is not equal with provided publisherId', async () => {
    const journalGroup1 = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: 'abc',
        createdBy: 'abc',
        journalsCount: 0,
      },
    });
    const journalGroup2 = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: 'abc',
        createdBy: 'abc',
        journalsCount: 0,
      },
    });
    const journalGroup3 = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: validPublisherId,
        createdBy: 'abc',
        journalsCount: 0,
      },
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        type: 'VOUCHER',
        title: 'abc',
        fundId: validFundId,
        publisherId: validPublisherId,
        terms: 'abc',
        note: 'abc',
        journalGroupIds: [journalGroup1.id, journalGroup3.id],
      },
    });

    await addPolicy(req as any, res as any);

    const policies = await prisma.policy.findMany({});

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData().message).toBe(
      'some of the provided journal groups does not have a publisherId equal to provided publisherId',
    );
    expect(policies).toHaveLength(0);

    await prisma.journalGroup.deleteMany({
      where: {
        OR: [
          {
            id: journalGroup1.id,
          },
          {
            id: journalGroup2.id,
          },
          {
            id: journalGroup3.id,
          },
        ],
      },
    });
  });

  it('should add policy (with just publisher and journalGroup relation)', async () => {
    const journalGroup1 = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: validPublisherId,
        createdBy: 'abc',
        journalsCount: 0,
      },
    });
    const journalGroup2 = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: 'abc',
        createdBy: 'abc',
        journalsCount: 0,
      },
    });
    const journalGroup3 = await prisma.journalGroup.create({
      data: {
        title: 'abc',
        fundId: 'abc',
        publisherId: validPublisherId,
        createdBy: 'abc',
        journalsCount: 0,
      },
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        type: 'VOUCHER',
        title: 'abc',
        fundId: validFundId,
        publisherId: validPublisherId,
        terms: 'abc',
        note: 'abc',
        isActive: false,
        journalGroupIds: [journalGroup1.id, journalGroup3.id],
      },
    });

    await addPolicy(req as any, res as any);

    const policy = await prisma.policy.findUnique({
      where: {
        id: res._getJSONData().id,
      },
    });
    const policyMemberships = await prisma.journalGroupsOfPolicy.findMany({});

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().fundId).toBe(validFundId);
    expect(policy?.fundId).toBe(validFundId);
    expect(policy?.isActive).toBe(false);
    expect(policy?.publisherId).toBe(validPublisherId);
    expect(policy?.createdBy).toBe('test');
    expect(policyMemberships).toHaveLength(2);
    expect(
      policyMemberships.map((policyMembership) => policyMembership.journalGroupId),
    ).toContain(journalGroup1.id);
    expect(
      policyMemberships.map((policyMembership) => policyMembership.journalGroupId),
    ).toContain(journalGroup3.id);

    await prisma.journalGroupsOfPolicy.deleteMany({});
    await prisma.journalGroup.deleteMany({
      where: {
        OR: [
          {
            id: journalGroup1.id,
          },
          {
            id: journalGroup2.id,
          },
          {
            id: journalGroup3.id,
          },
        ],
      },
    });
    await prisma.policy.delete({
      where: {
        id: policy?.id,
      },
    });
  });

  it('should add policy (with just publisher and isActive)', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        type: 'VOUCHER',
        title: 'abc',
        fundId: validFundId,
        isActive: false,
        publisherId: validPublisherId,
        terms: 'abc',
        note: 'abc',
      },
    });

    await addPolicy(req as any, res as any);

    const policy = await prisma.policy.findUnique({
      where: {
        id: res._getJSONData().id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().fundId).toBe(validFundId);
    expect(policy?.fundId).toBe(validFundId);
    expect(policy?.isActive).toBe(false);
    expect(policy?.publisherId).toBe(validPublisherId);
    expect(policy?.createdBy).toBe('test');

    await prisma.policy.delete({
      where: {
        id: policy?.id,
      },
    });
  });
});
