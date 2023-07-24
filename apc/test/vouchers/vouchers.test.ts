// eslint-disable-next-line import/order
import mockAuthManager, { defaultMockToken } from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';
import { v4 as uuidv4 } from 'uuid';

import { getBackendPrisma } from '$data/prisma';
import getVoucherById from '$pages/api/v1/vouchers';
import { roleSeparator } from '$service/groups/generateGroupId';

import { PrismaClient, Voucher } from '.prisma/backend-client';

let prisma: PrismaClient;

describe('vouchers api', () => {
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

  it('should return unauthorized for researcher', async () => {
    mockAuthManager({
      ...defaultMockToken,
      roles: [`Researcher${roleSeparator}12`],
    });
    const { req, res } = createMocks({
      query: {
        voucherId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });

    await getVoucherById(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);
  });

  it('should return Voucher', async () => {
    const createdPolicy = await prisma.policy.create({
      data: {
        type: 'VOUCHER',
        title: 'Journals 20% Discount (Vouchers) - STDF',
        fundId: '6119d1536a1eba00075b16a2',
        terms: '20% discount',
        isActive: true,
        note: 'This is a good policy',
        createdBy: 'sehsanmgmailcom',
        createdAt: '2021-09-13T08:41:04.088Z',
        publisherId: '609fc4ee18232d00065826e3',
      },
    });

    const createdVoucher = await prisma.voucher.create({
      data: {
        status: 'ALLOCATED',
        code: 'wid',
        policyId: createdPolicy.id,
        publisherId: '609fc51f18232d0006582c48',
        batchId: '3866d989-98be-42be-bb83-6fc17dbfe528',
      },
    });

    const { req, res } = createMocks({
      query: {
        voucherId: createdVoucher.id,
      },
    });

    await getVoucherById(req as any, res as any);

    const result = res._getJSONData() as Voucher;

    expect(res._getStatusCode()).toBe(200);

    expect(result).toEqual({
      ...createdVoucher,
      fundApplicationId: 0,
      createdAt: createdVoucher.createdAt.toISOString(),
    });

    await prisma.voucher.deleteMany({});

    await prisma.policy.deleteMany({});
  });

  it('should return null for none provided Voucher', async () => {
    const { req, res } = createMocks({
      query: {
        voucherId: uuidv4(),
      },
    });

    await getVoucherById(req as any, res as any);

    const result = res._getJSONData();

    expect(res._getStatusCode()).toBe(404);

    expect(result.message).toEqual('No Voucher exist with this ID');
  });
});
