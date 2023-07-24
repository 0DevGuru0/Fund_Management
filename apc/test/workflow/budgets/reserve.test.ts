// eslint-disable-next-line import/order
import mockAuthManager from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import reserve from '$pages/api/v1/workflow/budgets';

import { PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;

describe('reserve budget api', () => {
  beforeAll(async () => {
    mockAuthManager();

    prisma = await getBackendPrisma();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should error on not provided expected inputs', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await reserve(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error on invalid currency', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fundApplicationId: 1,
        currency: 'ABC',
        amount: 23.49,
      },
    });

    await reserve(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error on negative amount', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fundApplicationId: 1,
        currency: 'USD',
        amount: -1,
      },
    });

    await reserve(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error on zero amount', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fundApplicationId: 1,
        currency: 'USD',
        amount: 0,
      },
    });

    await reserve(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error on not found fundApplication id', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fundApplicationId: 1,
        currency: 'USD',
        amount: 23.49,
      },
    });

    await reserve(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
  });

  it("should error when fundApplication's policy type is not invoice", async () => {
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
        variables: {},
        state: 'abc',
      },
    });
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fundApplicationId: createdFundApplication.id,
        currency: 'USD',
        amount: 23.49,
      },
    });

    await reserve(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData().message).toBe(
      'provided fund application is not associated with a policy of type INVOICE',
    );

    await prisma.fundApplication.deleteMany({});
    await prisma.policy.deleteMany({});
  });

  it('should add a budget with reserved status and return its id', async () => {
    const currency = 'USD';
    const amount = 23.49980213;
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
        variables: {},
        state: 'abc',
      },
    });
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fundApplicationId: createdFundApplication.id,
        currency,
        amount,
      },
    });

    await reserve(req as any, res as any);

    const createdBudget = await prisma.budgetAllocation.findUnique({
      where: {
        id: res._getJSONData().budgetId,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(createdBudget?.currency).toBe(currency);
    expect(Number(createdBudget!.originalAmount)).toBe(23499802);

    await prisma.budgetAllocation.deleteMany({});
    await prisma.fundApplication.deleteMany({});
    await prisma.policy.deleteMany({});
  });
});
