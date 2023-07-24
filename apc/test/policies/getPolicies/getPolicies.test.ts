// eslint-disable-next-line import/order
import mockAuthManager from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import getPolicies from '$service/policies/api/getPoliciesApi';

import {
  getPoliciesTestData,
  journalId,
  emptyPolicyMembershipJournalId,
} from './getPolicies.data';

import { JournalGroup, Policy, PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;
let policies: Policy[];
let journalGroups: JournalGroup[];

jest.mock('$service/generated/repoGqlTypes', () => ({
  getSdk: jest.fn(() => ({
    getAllOrganizations: jest.fn((query) => {
      if (
        query.query.bool.must[1].terms._id[0] === 'abc' &&
        query.query.bool.must[2].match['Organization.type'] === 'Fund'
      ) {
        return {
          search: {
            items: [{ id: 'abc', title: 'AI' }],
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

describe('get policies api', () => {
  beforeAll(async () => {
    mockAuthManager();

    prisma = await getBackendPrisma();

    await prisma.policy.createMany({
      data: getPoliciesTestData.policies,
    });
    policies = await prisma.policy.findMany({});
    await prisma.journalGroup.createMany({
      data: getPoliciesTestData.journalGroups,
    });
    journalGroups = await prisma.journalGroup.findMany({});
    await prisma.journalGroupsOfPolicy.createMany({
      data: getPoliciesTestData.journalGroupsOfPolicy.map((policyMembership) => ({
        policyId: policies[policyMembership.policyId].id,
        journalGroupId: journalGroups[policyMembership.journalGroupId].id,
        assignedBy: policyMembership.assignedBy,
      })),
    });
    await prisma.journalsOfJournalGroup.createMany({
      data: getPoliciesTestData.journalsOfJournalGroup.map((journalMembership) => ({
        ...journalMembership,
        journalGroupId: journalGroups[journalMembership.journalGroupId].id,
      })),
    });
    await prisma.voucher.createMany({
      data: getPoliciesTestData.vouchers.map((voucher) => ({
        ...voucher,
        policyId: policies[voucher.policyId].id,
      })),
    });
  });

  afterAll(async () => {
    await prisma.voucher.deleteMany({});
    await prisma.journalsOfJournalGroup.deleteMany({});
    await prisma.journalGroupsOfPolicy.deleteMany({});
    await prisma.journalGroup.deleteMany({});
    await prisma.policy.deleteMany({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty when there is no group membership for this journal', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        journalId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });

    await getPolicies(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().activeCount).toBe(0);
    expect(res._getJSONData().inactiveCount).toBe(0);
    expect(res._getJSONData().policies).toHaveLength(0);
  });

  it('should return empty when there is no policy membership for journalGroups of this journal', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        journalId: emptyPolicyMembershipJournalId,
      },
    });

    await getPolicies(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().activeCount).toBe(0);
    expect(res._getJSONData().inactiveCount).toBe(0);
    expect(res._getJSONData().policies).toHaveLength(0);
  });

  it('journalId filter', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        journalId,
      },
    });

    await getPolicies(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().activeCount).toBe(3);
    expect(res._getJSONData().inactiveCount).toBe(1);
    expect(res._getJSONData().policies).toHaveLength(4);
    expect(res._getJSONData().policies[0].journalGroups).toBeUndefined();
  });

  it('journalId, isActive filter', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        journalId,
        isActive: 'true',
      },
    });

    await getPolicies(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().activeCount).toBe(3);
    expect(res._getJSONData().inactiveCount).toBe(1);
    expect(res._getJSONData().policies).toHaveLength(3);
    expect(res._getJSONData().policies[0].journalGroups).toBeUndefined();
  });

  it('journalId, id filter(journalId and id having intersection)', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        journalId,
        id: policies[0].id,
      },
    });

    await getPolicies(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().activeCount).toBe(1);
    expect(res._getJSONData().inactiveCount).toBe(0);
    expect(res._getJSONData().policies).toHaveLength(1);
    expect(res._getJSONData().policies[0].journalGroups).toBeUndefined();
  });

  it('journalId, id filter(journalId and id not having any intersection)', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        journalId,
        id: policies[4].id,
      },
    });

    await getPolicies(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().activeCount).toBe(0);
    expect(res._getJSONData().inactiveCount).toBe(0);
    expect(res._getJSONData().policies).toHaveLength(0);
  });

  it('type, title filter(journalGroups inclusion)', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        type: 'VOUCHER',
        title: 'c',
        fields: 'journalGroups',
      },
    });

    await getPolicies(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().activeCount).toBe(2);
    expect(res._getJSONData().inactiveCount).toBe(0);
    expect(res._getJSONData().policies).toHaveLength(2);
    expect(res._getJSONData().policies[0].journalGroups).toBeDefined();
  });

  it('type, title filter(fundDetails inclusion)', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        type: 'VOUCHER',
        title: 'c',
        fields: 'fundDetails',
      },
    });

    await getPolicies(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().activeCount).toBe(2);
    expect(res._getJSONData().inactiveCount).toBe(0);
    expect(res._getJSONData().policies).toHaveLength(2);
    expect(res._getJSONData().policies[0].fund).toBeDefined();
  });

  it('type, title filter(fundDetails and journalGroups inclusion)', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        type: 'VOUCHER',
        title: 'c',
        fields: 'fundDetails,journalGroups',
      },
    });

    await getPolicies(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().activeCount).toBe(2);
    expect(res._getJSONData().inactiveCount).toBe(0);
    expect(res._getJSONData().policies).toHaveLength(2);
    expect(res._getJSONData().policies[0].fund).toBeDefined();
    expect(res._getJSONData().policies[0].journalGroups).toBeDefined();
  });

  it('type filter(just return policies which have available voucher)', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        type: 'VOUCHER',
        hasAvailableVoucher: 'true',
      },
    });

    await getPolicies(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().activeCount).toBe(1);
    expect(res._getJSONData().inactiveCount).toBe(0);
    expect(res._getJSONData().policies).toHaveLength(1);
    expect(res._getJSONData().policies[0].id).toBe(policies[2].id);
  });

  it('journalGroupId filter', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        journalGroupId: journalGroups[1].id,
      },
    });

    await getPolicies(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().activeCount).toBe(2);
    expect(res._getJSONData().inactiveCount).toBe(1);
    expect(res._getJSONData().policies).toHaveLength(3);
    expect(res._getJSONData().policies[0].journalGroups).toBeUndefined();
  });
});
