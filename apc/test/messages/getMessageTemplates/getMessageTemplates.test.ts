// eslint-disable-next-line import/order
import mockAuthManager from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';

import { getBackendPrisma } from '$data/prisma';
import getMessageTemplates from '$service/messages/api/getMessageTemplatesApi';

import {
  getMessageTemplatesTestData,
  messageTemplateId,
} from './getMessageTemplates.data';

import { PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;

describe('get message templates api', () => {
  beforeAll(async () => {
    mockAuthManager();

    prisma = await getBackendPrisma();

    await prisma.messageTemplate.createMany({
      data: getMessageTemplatesTestData.messageTemplates,
    });
  });

  afterAll(async () => {
    await prisma.messageTemplate.deleteMany({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('empty result when search', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        search: 'test',
      },
    });

    await getMessageTemplates(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(0);
    expect(res._getJSONData().messageTemplates).toHaveLength(0);
  });

  it('a result when search body', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        search: 'fug',
      },
    });

    await getMessageTemplates(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(1);
    expect(res._getJSONData().messageTemplates).toHaveLength(1);
  });

  it('a result when search upercase', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        search: 'FUG',
      },
    });

    await getMessageTemplates(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(1);
    expect(res._getJSONData().messageTemplates).toHaveLength(1);
  });

  it('a result when search id', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        search: 'sunt',
      },
    });

    await getMessageTemplates(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(1);
    expect(res._getJSONData().messageTemplates).toHaveLength(1);
  });

  it('a result when filter by id', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: messageTemplateId,
      },
    });

    await getMessageTemplates(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().count).toBe(1);
    expect(res._getJSONData().messageTemplates).toHaveLength(1);
  });
});
