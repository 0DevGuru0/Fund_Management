// eslint-disable-next-line import/order
import mockAuthManager from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import createPaymentRecord from '$pages/api/v1/workflow/budgets/[budgetId]/payments';

import { PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;

describe('create payment record api', () => {
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

    await createPaymentRecord(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  // TODO: check why not able to validate?
  // it('should error on invalid receipt structure', async () => {
  //   const { req, res } = createMocks({
  //     method: 'POST',
  //     query: {
  //       budgetId: '123e4567-e89b-12d3-a456-426614174000',
  //     },
  //     body: {
  //       trackingCode: 'ABC',
  //       paidBy: 'BCD',
  //       paidAt: '08/21/2021',
  //       accountDetails: {
  //         a: 'b',
  //         b: 2,
  //       },
  //       receipt: {
  //         a: 'b',
  //       },
  //       currency: 'USD',
  //       amount: 1,
  //     },
  //   });

  //   await createPaymentRecord(req as any, res as any);

  //   expect(res._getStatusCode()).toBe(400);
  // });

  it('should error on invalid time string', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        budgetId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        trackingCode: 'ABC',
        paidBy: 'BCD',
        paidAt: 'ABC',
        accountDetails: {
          a: 'b',
          b: 2,
        },
        receipt: {
          storage: 'base64',
          name: 'fbc404bb-6a71-4f82-909b-772c9176bd46.pdf',
          url: 'data:application/pdf;base64,MTIzNA==',
          size: 4,
          type: 'application/pdf',
          originalName: 'empty.pdf',
        },
        currency: 'USD',
        amount: 1,
      },
    });

    await createPaymentRecord(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error on negative amount', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        budgetId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        trackingCode: 'ABC',
        paidBy: 'BCD',
        paidAt: '2016-12-14T15:55:00.000Z',
        accountDetails: {
          a: 'b',
          b: 2,
        },
        receipt: {
          storage: 'base64',
          name: 'fbc404bb-6a71-4f82-909b-772c9176bd46.pdf',
          url: 'data:application/pdf;base64,MTIzNA==',
          size: 4,
          type: 'application/pdf',
          originalName: 'empty.pdf',
        },
        currency: 'USD',
        amount: -1,
      },
    });

    await createPaymentRecord(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error on not found budget', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        budgetId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        trackingCode: 'ABC',
        paidBy: 'BCD',
        paidAt: '2016-12-14T15:55:00.000Z',
        accountDetails: {
          a: 'b',
          b: 2,
        },
        receipt: {
          storage: 'base64',
          name: 'fbc404bb-6a71-4f82-909b-772c9176bd46.pdf',
          url: 'data:application/pdf;base64,MTIzNA==',
          size: 4,
          type: 'application/pdf',
          originalName: 'empty.pdf',
        },
        currency: 'USD',
        amount: 1,
      },
    });

    await createPaymentRecord(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
  });

  it('should error when budget is not in RESERVED state', async () => {
    const currency = 'USD';
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
        status: 'CANCELLED',
        currency,
        originalAmount: 123125415,
        acceptedAmount: 0,
        policyId: createdFundApplication.policyId,
        fundApplicationId: createdFundApplication.id,
      },
    });

    const { req, res } = createMocks({
      method: 'POST',
      query: {
        budgetId: createdBudget.id,
      },
      body: {
        trackingCode: 'ABC',
        paidBy: 'BCD',
        paidAt: '2016-12-14T15:55:00.000Z',
        accountDetails: {
          a: 'b',
          b: 2,
        },
        receipt: {
          storage: 'base64',
          name: 'fbc404bb-6a71-4f82-909b-772c9176bd46.pdf',
          url: 'data:application/pdf;base64,MTIzNA==',
          size: 4,
          type: 'application/pdf',
          originalName: 'empty.pdf',
        },
        currency: 'USD',
        amount: 1,
      },
    });

    await createPaymentRecord(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData().message).toBe('provided budget is not in reserved state');

    await prisma.budgetAllocation.deleteMany({});
    await prisma.fundApplication.deleteMany({});
    await prisma.policy.deleteMany({});
  });

  it('should create payment record and update its budget and its acceptedAmount', async () => {
    const currency = 'USD';
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
        currency,
        originalAmount: 123125415,
        acceptedAmount: 0,
        policyId: createdFundApplication.policyId,
        fundApplicationId: createdFundApplication.id,
      },
    });

    const { req, res } = createMocks({
      method: 'POST',
      query: {
        budgetId: createdBudget.id,
      },
      body: {
        trackingCode: 'ABC',
        paidBy: 'BCD',
        paidAt: '2016-12-14T15:55:00.000Z',
        accountDetails: {
          a: 'b',
          b: 2,
        },
        receipt: {
          storage: 'base64',
          name: 'fbc404bb-6a71-4f82-909b-772c9176bd46.pdf',
          url: 'data:application/pdf;base64,MTIzNA==',
          size: 4,
          type: 'application/pdf',
          originalName: 'empty.pdf',
        },
        currency: 'USD',
        amount: 23.49,
      },
    });

    await createPaymentRecord(req as any, res as any);

    const createdPaymentRecord = await prisma.paymentRecord.findUnique({
      where: {
        id: res._getJSONData().paymentRecordId,
      },
    });
    const updatedBudget = await prisma.budgetAllocation.findUnique({
      where: {
        id: createdBudget.id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(Number(createdPaymentRecord?.amount)).toBe(23490000);
    expect(updatedBudget?.status).toBe('ALLOCATED');
    expect(updatedBudget?.paymentRecordId).toBe(createdPaymentRecord?.id);
    expect(Number(updatedBudget?.acceptedAmount)).toBe(23490000);

    await prisma.paymentRecord.deleteMany({});
    await prisma.budgetAllocation.deleteMany({});
    await prisma.fundApplication.deleteMany({});
    await prisma.policy.deleteMany({});
  });
});
