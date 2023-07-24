// eslint-disable-next-line import/order
import mockAuthManager from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import allocate from '$pages/api/v1/workflow/vouchers/[voucherId]/allocate';

import { PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;

describe('allocate voucher api', () => {
  beforeAll(async () => {
    mockAuthManager();

    prisma = await getBackendPrisma();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should error on not provided voucherId', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await allocate(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error on not found voucher id', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        voucherId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });

    await allocate(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
  });

  it('should error on not reserved voucher', async () => {
    const policy = await prisma.policy.create({
      data: {
        type: 'VOUCHER',
        title: 'abc',
        fundId: 'abc',
        terms: 'abc',
        note: 'abc',
        createdBy: 'abc',
      },
    });
    const voucher = await prisma.voucher.create({
      data: {
        status: 'AVAILABLE',
        code: 'bcd',
        policyId: policy.id,
        publisherId: 'cde',
        batchId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        voucherId: voucher.id,
      },
    });

    await allocate(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);

    await prisma.voucher.delete({
      where: {
        id: voucher.id,
      },
    });
    await prisma.policy.delete({
      where: {
        id: policy.id,
      },
    });
  });

  it('should update voucher to allocate and return allocated voucher', async () => {
    const policy = await prisma.policy.create({
      data: {
        type: 'VOUCHER',
        title: 'abc',
        terms: 'abc',
        fundId: 'abc',
        note: 'abc',
        createdBy: 'abc',
      },
    });
    let voucher = await prisma.voucher.create({
      data: {
        status: 'RESERVED',
        code: 'asfeqgfqweeqw',
        policyId: policy.id,
        publisherId: 'ewqtfsdag',
        batchId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        voucherId: voucher.id,
      },
    });

    await allocate(req as any, res as any);

    voucher = (await prisma.voucher.findUnique({
      where: {
        id: voucher.id,
      },
    }))!;

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().status).toBe('ALLOCATED');
    expect(voucher.status).toBe('ALLOCATED');

    await prisma.voucher.delete({
      where: {
        id: voucher.id,
      },
    });
    await prisma.policy.delete({
      where: {
        id: policy.id,
      },
    });
  });
});
