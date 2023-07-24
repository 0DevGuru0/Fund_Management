// eslint-disable-next-line import/order
import mockAuthManager from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import createFundApplication from '$pages/api/v1/workflow/fund-applications';

import { PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;

describe('create fund application api', () => {
  beforeAll(async () => {
    mockAuthManager();

    prisma = await getBackendPrisma();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should error on not provided inputs', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await createFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should create fund Application and return its id', async () => {
    const policy = await prisma.policy.create({
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
      body: {
        articleTitle: 'abc',
        articleFile: {
          storage: 'base64',
          name: 'fbc404bb-6a71-4f82-909b-772c9176bd46.pdf',
          url: 'data:application/pdf;base64,MTIzNA==',
          size: 4,
          type: 'application/pdf',
          originalName: 'empty.pdf',
        },
        userId: 'abc',
        policyId: policy.id,
        processInstanceId: '123e4567-e89b-12d3-a456-426614174000',
        fundId: 'abc',
        publisherId: 'abc',
        journalId: 'abc',
        affiliationId: 'abc',
        publishPrice: 123,
        currency: 'USD',
        state: 'started',
      },
    });

    await createFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBeString();

    await prisma.fundApplication.delete({
      where: {
        id: parseInt(res._getJSONData(), 10),
      },
    });
    await prisma.policy.delete({
      where: {
        id: policy.id,
      },
    });
  });
});
