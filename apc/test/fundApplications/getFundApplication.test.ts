// eslint-disable-next-line import/order
import mockAuthManager from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import getFundApplication from '$pages/api/v1/fund-applications';

import { getFundApplicationsTestData } from './getFundApplication.data';

import { FundApplication, Policy, PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;
let fundApplications: FundApplication[];
let policies: Policy[];
const publishPrice = 123000000;

describe('get fundApplication api', () => {
  beforeAll(async () => {
    mockAuthManager();

    prisma = await getBackendPrisma();

    await prisma.policy.createMany({
      data: getFundApplicationsTestData.policies,
    });
    policies = await prisma.policy.findMany({});
    await prisma.fundApplication.createMany({
      data: getFundApplicationsTestData.fundApplications.map((fundApplication) => ({
        ...fundApplication,
        publishPrice,
        policyId: policies[fundApplication.policyId].id,
      })),
    });
    fundApplications = await prisma.fundApplication.findMany({});
  });

  afterAll(async () => {
    await prisma.fundApplication.deleteMany({});
    await prisma.policy.deleteMany({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all fund Applications when nothing specified', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(fundApplications.length);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(fundApplications.length);
  });

  it('should return nothing when provided ids does not exist', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        fundApplicationIds: '1234,2345',
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(0);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(0);
  });

  it('should return nothing when provided ids are all invalid', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        fundApplicationIds: 'abc,cde',
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(0);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(0);
  });

  it('should return all specified fundApplications when provided ids are all valid and existed', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        fundApplicationIds: `${fundApplications[0].id},${fundApplications[1].id}`,
        sortBy: 'createdAt',
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(2);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(2);
  });

  it('should return one specific fundApplication when one id provided', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        fundApplicationIds: `${fundApplications[1].id}`,
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(1);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(1);
    expect(res._getJSONData().fundApplications[0].id).toBe(fundApplications[1].id);
  });

  it('should return one fundApplication when a not existed id with an existed id with an invalid id provided', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        fundApplicationIds: `1234,${fundApplications[0].id},abc`,
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(1);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(1);
    expect(res._getJSONData().fundApplications[0].id).toBe(fundApplications[0].id);
  });

  it('should return nothing when provided journalIds does not exist', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        journalIds: '1234,2345',
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(0);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(0);
  });

  it('should return all specified fundApplications when provided journalIds are all valid and existed', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        journalIds: `${fundApplications[0].journalId},${fundApplications[1].journalId}`,
        sortBy: 'createdAt',
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(2);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(2);
  });

  it('should return one specific fundApplication when one journalId provided', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        journalIds: `${fundApplications[1].journalId}`,
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(1);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(1);
    expect(res._getJSONData().fundApplications[0].id).toBe(fundApplications[1].id);
  });

  it('should return one specific fundApplication when one fundId provided', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        fundIds: `${fundApplications[1].fundId}`,
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(1);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(1);
    expect(res._getJSONData().fundApplications[0].id).toBe(fundApplications[1].id);
  });

  it('should return one specific fundApplication when one publisherId provided', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        publisherIds: `${fundApplications[1].publisherId}`,
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(1);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(1);
    expect(res._getJSONData().fundApplications[0].id).toBe(fundApplications[1].id);
  });

  it('should return one specific fundApplication when one state provided', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        states: `${fundApplications[1].state}`,
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(1);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(1);
    expect(res._getJSONData().fundApplications[0].id).toBe(fundApplications[1].id);
  });

  it('should return one specific fundApplication when startDate and endDate provided', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        startDate: '2021-10-12T08:39:14.600Z',
        endDate: '2021-10-14T08:39:14.600Z',
        sortBy: 'createdAt',
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(1);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(1);
    expect(res._getJSONData().fundApplications[0].id).toBe(fundApplications[0].id);
  });

  it('should return two specific fundApplication when startDate and endDate provided', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        startDate: '2021-10-12T08:39:14.600Z',
        endDate: '2021-10-15T08:39:14.600Z',
        sortBy: 'createdAt',
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(2);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(2);
  });

  it('should return two specific fundApplication when startDate provided', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        startDate: '2021-10-12T08:39:14.600Z',
        sortBy: 'createdAt',
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(2);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(2);
  });

  it('should return two specific fundApplication when endDate provided', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        endDate: '2021-10-15T08:39:14.600Z',
        sortBy: 'createdAt',
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(2);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(2);
  });

  it('should return no fundApplication when fundId and publisherId provided does not match to any fundApplication', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        fundIds: 'abc',
        publisherIds: 'xyz',
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(0);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(0);
  });

  it('should return sorted fundApplication by create date (desc) when use sortBy query', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        sortBy: 'createdAt',
      },
    });

    await getFundApplication(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(2);
    expect(res._getJSONData().totalPrice).toBe(
      ((res._getJSONData().count * publishPrice) / 1000000).toString(),
    );
    expect(res._getJSONData().fundApplications).toHaveLength(2);
    expect(res._getJSONData().fundApplications[0].id).toBe(fundApplications[1].id);
    expect(res._getJSONData().fundApplications[1].id).toBe(fundApplications[0].id);
  });
});
