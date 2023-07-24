// eslint-disable-next-line import/order
import mockAuthManager from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import reserve from '$pages/api/v1/workflow/vouchers/reserve';

import { PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;

describe('reserve voucher api', () => {
  beforeAll(async () => {
    prisma = await getBackendPrisma();
    mockAuthManager();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should error on not provided fund application id', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await reserve(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error on not found fundApplication id', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        fundApplicationId: 1,
      },
    });

    await reserve(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('such fund application does not exist');
  });

  it("should error when fundApplication's policy type is not voucher", async () => {
    const createdPolicy = await prisma.policy.create({
      data: {
        type: 'INVOICE',
        title: 'abc',
        fundId: 'abc',
        terms: 'abc',
        note: 'abc',
        createdBy: 'abc',
      },
    });
    const createdFundApplication = await prisma.fundApplication.create({
      data: {
        articleTitle: 'abc',
        articleFile: 'abc',
        userId: 'test',
        policyId: createdPolicy.id,
        processInstanceId: '123e4567-e89b-12d3-a456-426614174000',
        fundId: 'abc',
        publisherId: 'abc',
        journalId: 'abc',
        affiliationId: 'abc',
        publishPrice: 123,
        state: 'started',
        variables: {},
      },
    });
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        fundApplicationId: createdFundApplication.id,
      },
    });

    await reserve(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData().message).toBe('policy type is not voucher');

    await prisma.fundApplication.delete({
      where: {
        id: createdFundApplication.id,
      },
    });
    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });

  it('should error when no voucher exists for this Policy', async () => {
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
    const createdFundApplication = await prisma.fundApplication.create({
      data: {
        articleTitle: 'abc',
        articleFile: 'abc',
        userId: 'test',
        policyId: createdPolicy.id,
        processInstanceId: '123e4567-e89b-12d3-a456-426614174000',
        fundId: 'abc',
        publisherId: 'abc',
        journalId: 'abc',
        affiliationId: 'abc',
        publishPrice: 123,
        state: 'started',
        variables: {},
      },
    });
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        fundApplicationId: createdFundApplication.id,
      },
    });

    await reserve(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe(
      'there is no available voucher for this policy',
    );

    await prisma.fundApplication.delete({
      where: {
        id: createdFundApplication.id,
      },
    });
    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });

  it('should error when no available voucher exists', async () => {
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
    const voucher = await prisma.voucher.create({
      data: {
        status: 'RESERVED',
        code: 'abc',
        policyId: createdPolicy.id,
        publisherId: 'bcd',
        batchId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });
    const createdFundApplication = await prisma.fundApplication.create({
      data: {
        articleTitle: 'abc',
        articleFile: 'abc',
        userId: 'test',
        policyId: createdPolicy.id,
        processInstanceId: '123e4567-e89b-12d3-a456-426614174000',
        fundId: 'abc',
        publisherId: 'abc',
        journalId: 'abc',
        affiliationId: 'abc',
        publishPrice: 123,
        state: 'started',
        variables: {},
      },
    });
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        fundApplicationId: createdFundApplication.id,
      },
    });

    await reserve(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe(
      'there is no available voucher for this policy',
    );

    await prisma.fundApplication.delete({
      where: {
        id: createdFundApplication.id,
      },
    });
    await prisma.voucher.delete({
      where: {
        id: voucher.id,
      },
    });
    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });

  it('should change voucher status and return reserved voucher and set undefined lastReservedAt', async () => {
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
    const voucher = await prisma.voucher.create({
      data: {
        status: 'AVAILABLE',
        code: 'abc',
        policyId: createdPolicy.id,
        publisherId: 'bcd',
        batchId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });
    const createdFundApplication = await prisma.fundApplication.create({
      data: {
        articleTitle: 'abc',
        articleFile: 'abc',
        userId: 'test',
        policyId: createdPolicy.id,
        processInstanceId: '123e4567-e89b-12d3-a456-426614174000',
        fundId: 'abc',
        publisherId: 'abc',
        journalId: 'abc',
        affiliationId: 'abc',
        publishPrice: 123,
        state: 'started',
        variables: {},
      },
    });
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        fundApplicationId: createdFundApplication.id,
      },
    });

    await reserve(req as any, res as any);

    const updatedVoucher = await prisma.voucher.findUnique({
      where: {
        id: voucher.id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().status).toBe('RESERVED');
    expect(updatedVoucher!.status).toBe('RESERVED');
    expect(updatedVoucher!.lastReservedAt?.getTime()).toBeWithin(
      Date.now() - 1000,
      Date.now(),
    );

    await prisma.fundApplication.delete({
      where: {
        id: createdFundApplication.id,
      },
    });
    await prisma.voucher.delete({
      where: {
        id: voucher.id,
      },
    });
    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });

  it('should change voucher status and return reserved voucher and update defined lastReservedAt', async () => {
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
    const voucher = await prisma.voucher.create({
      data: {
        status: 'AVAILABLE',
        code: 'abc',
        policyId: createdPolicy.id,
        publisherId: 'bcd',
        batchId: '123e4567-e89b-12d3-a456-426614174000',
        lastReservedAt: new Date(1995, 11, 17),
      },
    });

    const createdFundApplication = await prisma.fundApplication.create({
      data: {
        articleTitle: 'abc',
        articleFile: 'abc',
        userId: 'test',
        policyId: createdPolicy.id,
        processInstanceId: '123e4567-e89b-12d3-a456-426614174000',
        fundId: 'abc',
        publisherId: 'abc',
        journalId: 'abc',
        affiliationId: 'abc',
        publishPrice: 123,
        state: 'started',
        variables: {},
      },
    });
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        fundApplicationId: createdFundApplication.id,
      },
    });

    await reserve(req as any, res as any);

    const updatedVoucher = await prisma.voucher.findUnique({
      where: {
        id: voucher.id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().status).toBe('RESERVED');
    expect(updatedVoucher!.status).toBe('RESERVED');
    expect(updatedVoucher!.lastReservedAt?.getTime()).toBeWithin(
      Date.now() - 1000,
      Date.now(),
    );

    await prisma.fundApplication.delete({
      where: {
        id: createdFundApplication.id,
      },
    });
    await prisma.voucher.delete({
      where: {
        id: voucher.id,
      },
    });
    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });
});
