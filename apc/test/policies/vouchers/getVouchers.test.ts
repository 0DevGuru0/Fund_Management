// eslint-disable-next-line import/order
import mockAuthManager, { defaultMockToken } from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import getVouchersOfPolicy from '$pages/api/v1/policies/[policyId]/vouchers';
import { roleSeparator } from '$service/groups/generateGroupId';
import { convertQueryStringToArray } from '$service/util/convertQueryStringToArray';

import { PrismaClient, Voucher } from '.prisma/backend-client';

// TODO: should be deleted when we get query response type safe.
interface VoucherCounts {
  AVAILABLE: number;
  RESERVED: number;
  ALLOCATED: number;
  SUSPENDED: number;
}

let prisma: PrismaClient;

describe('queryVouchersOfPolicy api', () => {
  beforeAll(async () => {
    mockAuthManager();

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

  it('should error on not provided policyId', async () => {
    const { req, res } = createMocks({});

    await getVouchersOfPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should return unauthorized for researcher', async () => {
    mockAuthManager({
      ...defaultMockToken,
      roles: [`Researcher${roleSeparator}12`],
    });
    const { req, res } = createMocks({
      query: {
        policyId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });

    await getVouchersOfPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);
  });

  it('should return empty when there is no such policy', async () => {
    const { req, res } = createMocks({
      query: {
        policyId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });

    await getVouchersOfPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().vouchers).toBeArray();
    expect(res._getJSONData().vouchers).toHaveLength(0);
    expect(res._getJSONData().counts.AVAILABLE).toBe(0);
    expect(res._getJSONData().counts.RESERVED).toBe(0);
    expect(res._getJSONData().counts.ALLOCATED).toBe(0);
    expect(res._getJSONData().counts.SUSPENDED).toBe(0);
  });

  it('should return empty when this policy does not have any voucher', async () => {
    const createdPolicy = await prisma.policy.create({
      data: {
        type: 'VOUCHER',
        title: 'abc',
        fundId: 'abc',
        terms: 'abc',
        note: 'abc',
        createdBy: 'abc',
      },
    });

    const { req, res } = createMocks({
      query: {
        policyId: createdPolicy.id,
      },
    });

    await getVouchersOfPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().vouchers).toBeArray();
    expect(res._getJSONData().vouchers).toHaveLength(0);
    expect(res._getJSONData().counts.AVAILABLE).toBe(0);
    expect(res._getJSONData().counts.RESERVED).toBe(0);
    expect(res._getJSONData().counts.ALLOCATED).toBe(0);
    expect(res._getJSONData().counts.SUSPENDED).toBe(0);

    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });

  it('should return Vouchers(code filter)', async () => {
    const createdPolicy = await prisma.policy.create({
      data: {
        type: 'VOUCHER',
        title: 'abc',
        fundId: 'abc',
        terms: 'abc',
        note: 'abc',
        createdBy: 'abc',
      },
    });
    await prisma.voucher.createMany({
      data: [
        {
          status: 'AVAILABLE',
          code: 'abc431',
          policyId: createdPolicy.id,
          publisherId: 'bcd',
          batchId: '123e4567-e89b-12d3-a456-426614174000',
        },
        {
          status: 'SUSPENDED',
          code: 'bcd431',
          policyId: createdPolicy.id,
          publisherId: 'cde',
          batchId: '123e4567-e89b-12d3-a456-426614174000',
        },
      ],
    });

    const { req, res } = createMocks({
      query: {
        policyId: createdPolicy.id,
        code: 'bcd',
      },
    });

    await getVouchersOfPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().vouchers).toBeArray();
    expect(res._getJSONData().vouchers).toHaveLength(1);
    expect(res._getJSONData().counts.AVAILABLE).toBe(0);
    expect(res._getJSONData().counts.RESERVED).toBe(0);
    expect(res._getJSONData().counts.ALLOCATED).toBe(0);
    expect(res._getJSONData().counts.SUSPENDED).toBe(1);

    await prisma.voucher.deleteMany({});
    await prisma.policy.deleteMany({});
  });

  it('should return Vouchers(policy filter)', async () => {
    const createdPolicy = await prisma.policy.create({
      data: {
        type: 'VOUCHER',
        title: 'abc',
        fundId: 'abc',
        terms: 'abc',
        note: 'abc',
        createdBy: 'abc',
      },
    });
    const voucher1 = await prisma.voucher.create({
      data: {
        status: 'AVAILABLE',
        code: 'abc',
        policyId: createdPolicy.id,
        publisherId: 'bcd',
        batchId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });
    const voucher2 = await prisma.voucher.create({
      data: {
        status: 'SUSPENDED',
        code: 'bcd',
        policyId: createdPolicy.id,
        publisherId: 'cde',
        batchId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });

    const { req, res } = createMocks({
      query: {
        policyId: createdPolicy.id,
      },
    });

    await getVouchersOfPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().vouchers).toBeArray();
    expect(res._getJSONData().vouchers).toHaveLength(2);
    expect(res._getJSONData().counts.AVAILABLE).toBe(1);
    expect(res._getJSONData().counts.RESERVED).toBe(0);
    expect(res._getJSONData().counts.ALLOCATED).toBe(0);
    expect(res._getJSONData().counts.SUSPENDED).toBe(1);

    await prisma.voucher.deleteMany({
      where: {
        OR: [
          {
            id: voucher1.id,
          },
          {
            id: voucher2.id,
          },
        ],
      },
    });
    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });

  it('should return error when status filter is invalid', async () => {
    const { req, res } = createMocks({
      query: {
        policyId: '123e4567-e89b-12d3-a456-426614174000',
        status: 'abc',
      },
    });

    await getVouchersOfPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should return Vouchers(policy & status filter)', async () => {
    const createdPolicy = await prisma.policy.create({
      data: {
        type: 'VOUCHER',
        title: 'abc',
        fundId: 'abc',
        terms: 'abc',
        note: 'abc',
        createdBy: 'abc',
      },
    });
    const voucher1 = await prisma.voucher.create({
      data: {
        status: 'ALLOCATED',
        code: 'abc',
        policyId: createdPolicy.id,
        publisherId: 'bcd',
        batchId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });
    const voucher2 = await prisma.voucher.create({
      data: {
        status: 'RESERVED',
        code: 'bcd',
        policyId: createdPolicy.id,
        publisherId: 'cde',
        batchId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });

    const { req, res } = createMocks({
      query: {
        policyId: createdPolicy.id,
        status: 'RESERVED',
      },
    });

    await getVouchersOfPolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().vouchers).toBeArray();
    expect(res._getJSONData().vouchers).toHaveLength(1);
    expect(res._getJSONData().counts.AVAILABLE).toBe(0);
    expect(res._getJSONData().counts.RESERVED).toBe(1);
    expect(res._getJSONData().counts.ALLOCATED).toBe(1);
    expect(res._getJSONData().counts.SUSPENDED).toBe(0);

    await prisma.voucher.deleteMany({
      where: {
        OR: [
          {
            id: voucher1.id,
          },
          {
            id: voucher2.id,
          },
        ],
      },
    });
    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });

  describe('getVocuhers by fundApplicationIds filter', () => {
    it('should return Vouchers(fundApplicationIds filter)', async () => {
      const createdPolicy = await prisma.policy.create({
        data: {
          type: 'VOUCHER',
          title: 'abc',
          fundId: 'abc',
          terms: 'abc',
          note: 'abc',
          createdBy: 'abc',
        },
      });

      await prisma.fundApplication.createMany({
        data: [
          {
            id: 3,
            affiliationId: '6113b69adfa05e0006f0a975',
            fundId: '610f0e3f0023940006e0dc9b',
            processInstanceId: '833c9582-1469-11ec-967b-0242ac140003',
            policyId: createdPolicy.id,
            articleFile: '',
            articleTitle: 'test',
            journalId: '609fc60c18232d000658460b',
            publisherId: '609fc4f918232d000658284c',
            publishPrice: 123,
            userId: 'researcher1',
            state: 'started',
            variables: {},
          },
          {
            id: 10,
            affiliationId: '6113b69adfa05e0006f0a975',
            fundId: '610f0e3f0023940006e0dc9b',
            processInstanceId: '834280c7-15ff-11ec-87b6-1242ac140003',
            policyId: createdPolicy.id,
            articleFile: '',
            articleTitle: 'test',
            journalId: '609fc60c18232d000658460b',
            publisherId: '609fc4f918232d000658284c',
            publishPrice: 123,
            userId: 'researcher2',
            state: 'started',
            variables: {},
          },
          {
            id: 5,
            affiliationId: '6113b69adfa05e0006f0a975',
            fundId: '610f0e3f0023940006e0dc9b',
            processInstanceId: '834280c7-15ff-11ec-87b6-1242cc140003',
            policyId: createdPolicy.id,
            articleFile: '',
            articleTitle: 'test',
            journalId: '609fc60c18232d000658460b',
            publisherId: '609fc4f918212d000658284c',
            publishPrice: 123,
            userId: 'researcher2',
            state: 'started',
            variables: {},
          },
        ],
      });

      const fundApplicationIdsQuery = '10,3';
      const fundApplicationIds = convertQueryStringToArray(fundApplicationIdsQuery).map(
        (id) => +id,
      );
      await prisma.voucher.createMany({
        data: [
          {
            status: 'ALLOCATED',
            code: 'a12',
            fundApplicationId: fundApplicationIds[0],
            policyId: createdPolicy.id,
            publisherId: 'bcd',
            batchId: '123e4567-e89b-12d3-a456-426614174000',
          },
          {
            status: 'RESERVED',
            code: 'b12',
            policyId: createdPolicy.id,
            fundApplicationId: fundApplicationIds[1],
            publisherId: 'cde',
            batchId: '123e4567-e89b-12d3-a456-426614174000',
          },
          {
            status: 'ALLOCATED',
            code: 'abc',
            fundApplicationId: 5,
            policyId: createdPolicy.id,
            publisherId: 'bcs',
            batchId: '123e4567-e89b-12d3-a456-426614174000',
          },
        ],
      });

      const { req, res } = createMocks({
        query: {
          policyId: createdPolicy.id,
          fundApplicationIds: fundApplicationIdsQuery,
        },
      });

      await getVouchersOfPolicy(req as any, res as any);

      const { vouchers, counts } = res._getJSONData() as {
        vouchers: Voucher[];
        counts: VoucherCounts;
      };

      const filteredVouchers = vouchers.filter((voucher) =>
        fundApplicationIds.includes(voucher.fundApplicationId!),
      );

      const resultVouchersFundApplicationIds = filteredVouchers.map(
        (voucher) => voucher.fundApplicationId!,
      );

      expect(res._getStatusCode()).toBe(200);
      expect(filteredVouchers).toHaveLength(2);
      expect(resultVouchersFundApplicationIds).toIncludeSameMembers(fundApplicationIds);
      expect(vouchers).toBeArray();
      expect(vouchers).toHaveLength(2);
      expect(counts.RESERVED).toBe(1);
      expect(counts.ALLOCATED).toBe(1);
      expect(counts.AVAILABLE).toBe(0);
      expect(counts.SUSPENDED).toBe(0);

      await prisma.voucher.deleteMany({});

      await prisma.fundApplication.deleteMany({});

      await prisma.policy.deleteMany({});
    });

    it('should return Error when fundApplicationIds format is wrong', async () => {
      const createdPolicy = await prisma.policy.create({
        data: {
          type: 'VOUCHER',
          title: 'abc',
          fundId: 'abc',
          terms: 'abc',
          note: 'abc',
          createdBy: 'abc',
        },
      });

      const { req, res } = createMocks({
        query: {
          policyId: createdPolicy.id,
          fundApplicationIds: '1,abc',
        },
      });

      await getVouchersOfPolicy(req as any, res as any);

      expect(res._getStatusCode()).toBe(400);
      expect(res._getJSONData().message).toEqual(
        'fundApplicationIds should just include numbers',
      );
    });
  });
});
