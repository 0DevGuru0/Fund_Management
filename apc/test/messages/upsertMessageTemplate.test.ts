// eslint-disable-next-line import/order
import { createMocks } from 'node-mocks-http';
import { getBackendPrisma } from '$data/prisma';
import mockAuthManager, { defaultMockToken } from '$service/auth/mocks/getAuthManager';
import { roleSeparator } from '$service/groups/generateGroupId';
import upsertMessageTemplate from '$service/messages/api/upsertMessageTemplateApi';

import { PrismaClient } from '.prisma/backend-client';

let prisma: PrismaClient;

describe('upsert message API', () => {
  beforeAll(async () => {
    prisma = await getBackendPrisma();
  });

  beforeEach(() => {
    mockAuthManager({
      ...defaultMockToken,
      roles: [`SystemAdmin${roleSeparator}11`],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should error on not provided inputs', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
    });

    await upsertMessageTemplate(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error when required fields has not specified in the channels', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: {
        templateId: 'blah {{blah1}} blah',
        body: 'blah {{blah2}} blah',
        channels: [
          {
            abc: 'abc',
          },
        ],
      },
    });

    await upsertMessageTemplate(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error when provided channel type not compatible with any of expected channels', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: {
        templateId: 'blah {{blah1}} blah',
        body: 'blah {{blah2}} blah',
        channels: [
          {
            isActive: true,
            type: 'abc',
          },
        ],
      },
    });

    await upsertMessageTemplate(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error when required fields of the specified channel type has not provided', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: {
        templateId: 'blah {{blah1}} blah',
        body: 'blah {{blah2}} blah',
        channels: [
          {
            isActive: true,
            type: 'email',
          },
        ],
      },
    });

    await upsertMessageTemplate(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
  });

  it('should error when the user is not the SystemAdmin', async () => {
    mockAuthManager();
    const templateId = 'hey there';
    const body = 'blah {{blah}} blah';
    const channels = [
      {
        isActive: true,
        type: 'email',
        subject: 'hey there',
        from: 'test@iknito.com',
      },
    ];
    const { req, res } = createMocks({
      method: 'PUT',
      roles: 'SystemAdmin',
      body: {
        templateId,
        body,
        channels,
      },
    });

    await upsertMessageTemplate(req as any, res as any);

    expect(res._getStatusCode()).toBe(403);
  });

  it('should create a messageTemplate with one channel and return it', async () => {
    const templateId = 'hey there';
    const body = 'blah {{blah}} blah';
    const channels = [
      {
        isActive: true,
        type: 'email',
        subject: 'hey there',
        from: 'test@iknito.com',
      },
    ];
    const { req, res } = createMocks({
      method: 'PUT',
      roles: 'SystemAdmin',
      body: {
        templateId,
        body,
        channels,
      },
    });

    await upsertMessageTemplate(req as any, res as any);

    const addedTemplateMessage = await prisma.messageTemplate.findUnique({
      where: {
        id: templateId,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().id).toBe(templateId);
    expect(res._getJSONData().channels).toBeDeepEqual(channels);
    expect(addedTemplateMessage?.body).toBe(body);
    expect(addedTemplateMessage?.channels).toBeDeepEqual(channels);

    await prisma.messageTemplate.deleteMany({ where: {} });
  });

  it('should update a messageTemplate with more than one channel and return it', async () => {
    const templateId = 'hey there';

    await prisma.messageTemplate.create({
      data: {
        id: templateId,
        body: 'nice {{job}} dude',
        channels: 'some dummy channels',
      },
    });

    const body = 'blah {{blah}} blah';
    const channels = [
      {
        isActive: true,
        type: 'email',
        subject: 'hey there',
        from: 'test@iknito.com',
      },
      {
        isActive: false,
        type: 'notification',
      },
    ];
    const { req, res } = createMocks({
      method: 'PUT',
      body: {
        templateId,
        body,
        channels,
      },
    });

    await upsertMessageTemplate(req as any, res as any);

    const addedTemplateMessage = await prisma.messageTemplate.findUnique({
      where: {
        id: templateId,
      },
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().id).toBe(templateId);
    expect(res._getJSONData().body).toBe(body);
    expect(res._getJSONData().channels).toBeDeepEqual(channels);
    expect(addedTemplateMessage?.body).toBe(body);
    expect(addedTemplateMessage?.channels).toBeDeepEqual(channels);

    await prisma.messageTemplate.deleteMany({ where: {} });
  });
});
