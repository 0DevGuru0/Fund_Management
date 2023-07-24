// eslint-disable-next-line import/order
import mockAuthManager from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import updateFundApplication from '$pages/api/v1/workflow/fund-applications/[fundApplicationId]';

import { Prisma, PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;

describe('update fundApplication api', () => {
  beforeAll(async () => {
    mockAuthManager();

    prisma = await getBackendPrisma();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should error on not provided fundApplicationId', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
    });

    await updateFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error when a non-int32 format provided for fundApplicationId', async () => {
    const { req, res } = createMocks({
      query: {
        fundApplicationId: 'abc',
      },
      method: 'PUT',
    });

    await updateFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData().extensions[0].message).toBe('must match format "int32"');
  });

  it('should error when provided fundApplication does not exist', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        fundApplicationId: '123',
      },
    });

    await updateFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('provided fundApplication does not exist');
  });

  it('should not have any effect when no data provided', async () => {
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
      method: 'PUT',
      query: {
        fundApplicationId: createdFundApplication.id,
      },
    });

    await updateFundApplication(req as any, res as any);

    const updatedFundApplication = await prisma.fundApplication.findUnique({
      where: {
        id: createdFundApplication.id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(updatedFundApplication).toBeDeepEqual(createdFundApplication);

    await prisma.fundApplication.deleteMany();
    await prisma.policy.deleteMany();
  });

  it('should update state', async () => {
    const variables = {
      abc: 'cde',
    };
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
        variables,
      },
    });

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        fundApplicationId: createdFundApplication.id,
      },
      body: {
        state: 'working',
      },
    });

    await updateFundApplication(req as any, res as any);

    const updatedFundApplication = await prisma.fundApplication.findUnique({
      where: {
        id: createdFundApplication.id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(updatedFundApplication?.state).toBe('working');
    expect(updatedFundApplication?.variables).toBeDeepEqual(variables);

    await prisma.fundApplication.deleteMany();
    await prisma.policy.deleteMany();
  });

  it('should update state and update empty variables', async () => {
    const state = 'working';
    const approveVoucherComment = 'approved';
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
      method: 'PUT',
      query: {
        fundApplicationId: createdFundApplication.id,
      },
      body: {
        state,
        variables: { approveVoucherComment },
      },
    });

    await updateFundApplication(req as any, res as any);

    const updatedFundApplication = await prisma.fundApplication.findUnique({
      where: {
        id: createdFundApplication.id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(updatedFundApplication?.state).toBe(state);
    const variables = updatedFundApplication?.variables! as Prisma.JsonObject;
    expect(variables.approveVoucherComment).toBe(approveVoucherComment);

    await prisma.fundApplication.deleteMany();
    await prisma.policy.deleteMany();
  });

  it('should append variable to not empty variables and update another one and make null one other', async () => {
    const acceptanceLetterDay = '1999-01-10';
    const invoiceCurrency = 'EUR';
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
        variables: {
          invoiceCurrency: 'USD',
          approvedBudget: 123,
        },
      },
    });

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        fundApplicationId: createdFundApplication.id,
      },
      body: {
        variables: {
          invoiceCurrency,
          approvedBudget: null,
          acceptanceLetterDay,
        },
      },
    });

    await updateFundApplication(req as any, res as any);

    const updatedFundApplication = await prisma.fundApplication.findUnique({
      where: {
        id: createdFundApplication.id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    const variables = updatedFundApplication?.variables! as Prisma.JsonObject;
    expect(variables.invoiceCurrency).toBe(invoiceCurrency);
    expect(variables.approvedBudget).toBeNull();
    expect(variables.acceptanceLetterDay).toBe(acceptanceLetterDay);

    await prisma.fundApplication.deleteMany();
    await prisma.policy.deleteMany();
  });
});
