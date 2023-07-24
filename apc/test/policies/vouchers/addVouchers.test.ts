// eslint-disable-next-line import/order
import mockAuthManager, { defaultMockToken } from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import addVouchersToPolicy from '$pages/api/v1/policies/[policyId]/vouchers/bulk-insert';
import { roleSeparator } from '$service/groups/generateGroupId';

import { PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;

const validPublisherIds = ['1', '2'];

jest.mock('$service/generated/repoGqlTypes', () => ({
  getSdk: jest.fn(() => ({
    getAllOrganizations: jest.fn((query) => {
      if (
        validPublisherIds.includes(query.query.bool.must[1].terms._id[0]) &&
        validPublisherIds.includes(query.query.bool.must[1].terms._id[1])
      ) {
        return {
          search: {
            items: [
              { _id: validPublisherIds[0], title: 'AI1' },
              { _id: validPublisherIds[1], title: 'AI2' },
            ],
          },
        };
      } else if (
        validPublisherIds.includes(query.query.bool.must[1].terms._id[0]) ||
        validPublisherIds.includes(query.query.bool.must[1].terms._id[1])
      ) {
        return {
          search: {
            items: [{ _id: validPublisherIds[0], title: 'AI' }],
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

describe('add vouchers to policy api', () => {
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

    await addVouchersToPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error on empty vouchers', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        policyId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        vouchers: [],
      },
    });

    await addVouchersToPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error on not provided expected fields in vouchers', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        policyId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        vouchers: [{ code: 'abc' }],
      },
    });

    await addVouchersToPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error when time strings are not as expected', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        policyId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        vouchers: [{ code: 'abc', publisherId: '3', expiresAt: 'abc' }],
      },
    });

    await addVouchersToPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error when the user has no role', async () => {
    mockAuthManager();

    const { req, res } = createMocks({
      method: 'POST',
      query: {
        policyId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        vouchers: [{ code: 'abc', publisherId: '3' }],
      },
    });

    await addVouchersToPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);
  });

  it('should error when roles does not have any fund manager role', async () => {
    mockAuthManager({
      ...defaultMockToken,
      roles: [`Researcher${roleSeparator}12`],
    });

    const { req, res } = createMocks({
      method: 'POST',
      query: {
        policyId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        vouchers: [{ code: 'abc', publisherId: '3' }],
      },
    });

    await addVouchersToPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);
  });

  it('should error when such publisher does not exist in repository and such policy in database', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        policyId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        vouchers: [{ code: 'abc', publisherId: '3' }],
      },
    });

    await addVouchersToPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('Not Found');
    expect(res._getJSONData().extensions).toHaveLength(2);
    expect(res._getJSONData().extensions[1].items[0]).toBe('3');
  });

  it('should error when such policy does not exist in database', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        policyId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        vouchers: [{ code: 'abc', publisherId: '2' }],
      },
    });

    await addVouchersToPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('Not Found');
    expect(res._getJSONData().extensions).toHaveLength(1);
  });

  it('should error when such publisher does not exist in repository', async () => {
    const createdPolicy = await prisma.policy.create({
      data: {
        type: 'VOUCHER',
        terms: 'abc',
        title: 'abc',
        fundId: 'abc',
        note: 'abc',
        createdBy: 'abc',
      },
    });
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        policyId: createdPolicy.id,
      },
      body: {
        vouchers: [{ code: 'abc', publisherId: '3' }],
      },
    });

    await addVouchersToPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('Not Found');
    expect(res._getJSONData().extensions).toHaveLength(1);
    expect(res._getJSONData().extensions[0].items[0]).toBe('3');

    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });

  it('should error when such policy is not a voucher type', async () => {
    const createdPolicy = await prisma.policy.create({
      data: {
        type: 'INVOICE',
        terms: 'abc',
        title: 'abc',
        fundId: 'abc',
        note: 'abc',
        createdBy: 'abc',
      },
    });
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        policyId: createdPolicy.id,
      },
      body: {
        vouchers: [{ code: 'abc', publisherId: '2' }],
      },
    });

    await addVouchersToPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData().message).toBe('provided policy is not a voucher type');

    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });

  it('should error when the client does not have the role of the organization of the policy', async () => {
    mockAuthManager({
      ...defaultMockToken,
      roles: [`FundManager${roleSeparator}12`],
    });

    const createdPolicy = await prisma.policy.create({
      data: {
        type: 'VOUCHER',
        terms: 'abc',
        title: 'abc',
        fundId: 'abc',
        note: 'abc',
        createdBy: 'abc',
      },
    });

    const { req, res } = createMocks({
      method: 'POST',
      query: {
        policyId: createdPolicy.id,
      },
      body: {
        vouchers: [{ code: 'abc', publisherId: '1' }],
      },
    });

    await addVouchersToPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);

    await prisma.voucher.deleteMany({
      where: {
        policyId: createdPolicy.id,
      },
    });
    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });

  it('should add one voucher(without batchId)(with fund manager role)', async () => {
    const fundId = 'abc';
    mockAuthManager({
      ...defaultMockToken,
      roles: [`FundManager${roleSeparator}${fundId}`],
    });
    const createdPolicy = await prisma.policy.create({
      data: {
        type: 'VOUCHER',
        terms: 'abc',
        title: 'abc',
        fundId,
        note: 'abc',
        createdBy: 'abc',
      },
    });

    const { req, res } = createMocks({
      method: 'POST',
      query: {
        policyId: createdPolicy.id,
      },
      body: {
        vouchers: [{ code: 'abc', publisherId: '1' }],
      },
    });

    await addVouchersToPolicy(req as any, res as any);

    const addedVouchers = await prisma.voucher.findMany({
      where: {
        policyId: createdPolicy.id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().additionCount).toBe(1);
    expect(addedVouchers).toHaveLength(1);

    await prisma.voucher.deleteMany({
      where: {
        policyId: createdPolicy.id,
      },
    });
    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });

  it('should add one voucher(without batchId)(with system admin role)', async () => {
    const createdPolicy = await prisma.policy.create({
      data: {
        type: 'VOUCHER',
        terms: 'abc',
        title: 'abc',
        fundId: 'abc',
        note: 'abc',
        createdBy: 'abc',
      },
    });

    const { req, res } = createMocks({
      method: 'POST',
      query: {
        policyId: createdPolicy.id,
      },
      body: {
        vouchers: [{ code: 'abc', publisherId: '1' }],
      },
    });

    await addVouchersToPolicy(req as any, res as any);

    const addedVouchers = await prisma.voucher.findMany({
      where: {
        policyId: createdPolicy.id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().additionCount).toBe(1);
    expect(addedVouchers).toHaveLength(1);

    await prisma.voucher.deleteMany({
      where: {
        policyId: createdPolicy.id,
      },
    });
    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });

  it('should add more than one voucher(with batchId and expire time and usable time)', async () => {
    const batchId = '123e4567-e89b-12d3-a456-426614174000';
    const timeString = '2021-08-21T10:06:39.341Z';
    const createdPolicy = await prisma.policy.create({
      data: {
        type: 'VOUCHER',
        terms: 'abc',
        title: 'abc',
        fundId: 'abc',
        note: 'abc',
        createdBy: 'abc',
      },
    });

    const { req, res } = createMocks({
      method: 'POST',
      query: {
        policyId: createdPolicy.id,
      },
      body: {
        vouchers: [
          { code: 'abc', publisherId: '1', usableAfter: timeString },
          { code: 'bcd', publisherId: '2', expiresAt: timeString },
          { code: 'cde', publisherId: '1', usableAfter: timeString },
        ],
        batchId,
      },
    });

    await addVouchersToPolicy(req as any, res as any);

    const addedVouchers = await prisma.voucher.findMany({
      where: {
        policyId: createdPolicy.id,
      },
    });
    const addedBatchDetails = await prisma.batchDetails.findMany({
      where: {
        batchId,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().additionCount).toBe(3);
    expect(addedVouchers).toHaveLength(3);
    expect(addedVouchers[0].batchId).toBe(batchId);
    expect(addedVouchers[0].usableAfter).toBeDeepEqual(new Date(timeString));
    expect(addedVouchers[0].expiresAt).toBeNull();
    expect(addedVouchers[1].usableAfter).toBeNull();
    expect(addedVouchers[1].expiresAt).toBeDeepEqual(new Date(timeString));
    expect(addedVouchers[2].usableAfter).toBeDeepEqual(new Date(timeString));
    expect(addedVouchers[2].expiresAt).toBeNull();
    expect(addedBatchDetails[0].batchId).toBe(batchId);
    expect(addedBatchDetails[0].operator).toBe(defaultMockToken.preferred_username);

    await prisma.batchDetails.deleteMany({
      where: {
        batchId,
      },
    });
    await prisma.voucher.deleteMany({
      where: {
        policyId: createdPolicy.id,
      },
    });
    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });
});
