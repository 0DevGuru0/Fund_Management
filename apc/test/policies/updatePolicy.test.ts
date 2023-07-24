// eslint-disable-next-line import/order
import mockAuthManager, { defaultMockToken } from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import updatePolicy from '$pages/api/v1/policies/[policyId]';
import { roleSeparator } from '$service/groups/generateGroupId';

import { PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;

describe('update policy api', () => {
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
      method: 'PUT',
    });

    await updatePolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error when the user has no role', async () => {
    mockAuthManager();

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        policyId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        isActive: true,
      },
    });

    await updatePolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);
  });

  it('should error when roles does not have any fund manager role', async () => {
    mockAuthManager({
      ...defaultMockToken,
      roles: [`Researcher${roleSeparator}12`],
    });

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        policyId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        isActive: true,
      },
    });

    await updatePolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);
  });

  it('should error when provided policy does not exist', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        policyId: '123e4567-e89b-12d3-a456-426614174000',
      },
      body: {
        isActive: true,
      },
    });

    await updatePolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData().message).toBe('provided policy does not exist');
  });

  it('should error when provided policy has the same isActive as provided', async () => {
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
      method: 'PUT',
      query: {
        policyId: createdPolicy.id,
      },
      body: {
        isActive: true,
      },
    });

    await updatePolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData().message).toBe('provided isActive make no change to policy');

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
        title: 'abc',
        fundId: 'abc',
        terms: 'abc',
        note: 'abc',
        createdBy: 'abc',
      },
    });

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        policyId: createdPolicy.id,
      },
      body: {
        isActive: false,
      },
    });

    await updatePolicy(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);

    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });

  it('should update isActive(with fund manager role)', async () => {
    const fundId = 'abc';
    mockAuthManager({
      ...defaultMockToken,
      roles: [`FundManager${roleSeparator}${fundId}`],
    });
    const createdPolicy = await prisma.policy.create({
      data: {
        type: 'VOUCHER',
        title: 'abc',
        fundId,
        terms: 'abc',
        note: 'abc',
        createdBy: 'abc',
      },
    });

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        policyId: createdPolicy.id,
      },
      body: {
        isActive: false,
      },
    });

    await updatePolicy(req as any, res as any);

    const updatedPolicy = await prisma.policy.findUnique({
      where: {
        id: createdPolicy.id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().id).toBe(createdPolicy.id);
    expect(res._getJSONData().isActive).toBe(false);
    expect(updatedPolicy?.isActive).toBe(false);

    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });

  it('should update isActive(with system admin role)', async () => {
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
      method: 'PUT',
      query: {
        policyId: createdPolicy.id,
      },
      body: {
        isActive: false,
      },
    });

    await updatePolicy(req as any, res as any);

    const updatedPolicy = await prisma.policy.findUnique({
      where: {
        id: createdPolicy.id,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().id).toBe(createdPolicy.id);
    expect(res._getJSONData().isActive).toBe(false);
    expect(updatedPolicy?.isActive).toBe(false);

    await prisma.policy.delete({
      where: {
        id: createdPolicy.id,
      },
    });
  });
});
