// eslint-disable-next-line import/order
import mockAuthManager from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import cancelReservation from '$pages/api/v1/workflow/budgets/[budgetId]/cancel';

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

  it('should error on not provided budgetId', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
    });

    await cancelReservation(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error on not found budget', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        budgetId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });

    await cancelReservation(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('provided budget does not exist');
  });

  it('should return error when budget state is not reserved', async () => {
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
    const createdBudget = await prisma.budgetAllocation.create({
      data: {
        status: 'ALLOCATED',
        currency: 'ABC',
        originalAmount: 123,
        acceptedAmount: 0,
        policyId: createdPolicy.id,
        fundApplicationId: createdFundApplication.id,
      },
    });

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        budgetId: createdBudget.id,
      },
    });

    await cancelReservation(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData().message).toBe('provided budget is not in reserved state');

    await prisma.budgetAllocation.deleteMany({});
    await prisma.fundApplication.deleteMany({});
    await prisma.policy.deleteMany({});
  });

  it('should cancel reserved budget', async () => {
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
    const createdBudget = await prisma.budgetAllocation.create({
      data: {
        status: 'RESERVED',
        currency: 'ABC',
        originalAmount: 123098000,
        acceptedAmount: 0,
        policyId: createdPolicy.id,
        fundApplicationId: createdFundApplication.id,
      },
    });

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        budgetId: createdBudget.id,
      },
    });

    await cancelReservation(req as any, res as any);

    const updatedBudget = await prisma.budgetAllocation.findUnique({
      where: {
        id: createdBudget.id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().id).toBe(createdBudget.id);
    expect(res._getJSONData().status).toBe('CANCELLED');
    expect(res._getJSONData().originalAmount).toBe('123.098');
    expect(updatedBudget?.status).toBe('CANCELLED');

    await prisma.budgetAllocation.deleteMany({});
    await prisma.fundApplication.deleteMany({});
    await prisma.policy.deleteMany({});
  });
});
