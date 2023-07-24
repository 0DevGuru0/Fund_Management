// eslint-disable-next-line import/order
import mockAuthManager from '$service/auth/mocks/getAuthManager';
import { createMocks } from 'node-mocks-http';
import { mocked } from 'ts-jest/utils';

import organizations from '$pages/api/v1/workflow/organizations';
import { getSdk } from '$service/generated/repoGqlTypes';

jest.mock('$service/generated/repoGqlTypes', () => ({
  getSdk: jest.fn(() => ({
    getAllOrganizations: jest.fn(() => ({
      search: {
        items: [],
      },
    })),
  })),
}));

const mockedGetSdk = mocked(getSdk, true);

describe('organizations api', () => {
  beforeAll(() => {
    mockAuthManager();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get 10 from start with empty request', async () => {
    const { req, res } = createMocks({});

    await organizations(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBeArray();
    expect(mockedGetSdk.mock.calls).toHaveLength(1);
    const mockedGetAllOrganizations = mocked(
      mockedGetSdk.mock.results[0].value.getAllOrganizations,
    );
    expect(mockedGetAllOrganizations.mock.calls).toHaveLength(1);
    expect(mockedGetAllOrganizations.mock.calls[0][0].limit).toBe(10);
    expect(mockedGetAllOrganizations.mock.calls[0][0].offset).toBe(0);
  });

  it('should get 50 from start with limit>50 and skip<0', async () => {
    const { req, res } = createMocks({
      query: {
        limit: 51,
        skip: -1,
      },
    });

    await organizations(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBeArray();
    expect(mockedGetSdk.mock.calls).toHaveLength(1);
    const mockedGetAllOrganizations = mocked(
      mockedGetSdk.mock.results[0].value.getAllOrganizations,
    );
    expect(mockedGetAllOrganizations.mock.calls).toHaveLength(1);
    expect(mockedGetAllOrganizations.mock.calls[0][0].limit).toBe(50);
    expect(mockedGetAllOrganizations.mock.calls[0][0].offset).toBe(0);
  });

  it('should get 20 from 10 items ahead of start with limit=20 and skip=10', async () => {
    const limit = 20,
      skip = 10;
    const { req, res } = createMocks({
      query: {
        limit,
        skip,
      },
    });

    await organizations(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBeArray();
    expect(mockedGetSdk.mock.calls).toHaveLength(1);
    const mockedGetAllOrganizations = mocked(
      mockedGetSdk.mock.results[0].value.getAllOrganizations,
    );
    expect(mockedGetAllOrganizations.mock.calls).toHaveLength(1);
    expect(mockedGetAllOrganizations.mock.calls[0][0].limit).toBe(limit);
    expect(mockedGetAllOrganizations.mock.calls[0][0].offset).toBe(skip);
  });

  it('should error on invalid type', async () => {
    const type = 'abc';
    const { req, res } = createMocks({
      query: {
        type,
      },
    });

    await organizations(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(mockedGetSdk.mock.calls).toHaveLength(0);
  });

  it('should filter by type', async () => {
    const type = 'Publisher';
    const { req, res } = createMocks({
      query: {
        type,
      },
    });

    await organizations(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBeArray();
    expect(mockedGetSdk.mock.calls).toHaveLength(1);
    const mockedGetAllOrganizations = mocked(
      mockedGetSdk.mock.results[0].value.getAllOrganizations,
    );
    expect(mockedGetAllOrganizations.mock.calls).toHaveLength(1);
    expect(mockedGetAllOrganizations.mock.calls[0][0].limit).toBe(10);
    expect(mockedGetAllOrganizations.mock.calls[0][0].offset).toBe(0);
    expect(mockedGetAllOrganizations.mock.calls[0][0].query.bool.must).toHaveLength(2);
    expect(
      mockedGetAllOrganizations.mock.calls[0][0].query.bool.must[1].match[
        'Organization.type'
      ],
    ).toBe(type);
  });

  it('should filter by title and type', async () => {
    const type = 'Fund',
      title = 'bcd';
    const { req, res } = createMocks({
      query: {
        type,
        title,
      },
    });

    await organizations(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBeArray();
    expect(mockedGetSdk.mock.calls).toHaveLength(1);
    const mockedGetAllOrganizations = mocked(
      mockedGetSdk.mock.results[0].value.getAllOrganizations,
    );
    expect(mockedGetAllOrganizations.mock.calls).toHaveLength(1);
    expect(mockedGetAllOrganizations.mock.calls[0][0].limit).toBe(10);
    expect(mockedGetAllOrganizations.mock.calls[0][0].offset).toBe(0);
    expect(mockedGetAllOrganizations.mock.calls[0][0].query.bool.must).toHaveLength(3);
    expect(
      mockedGetAllOrganizations.mock.calls[0][0].query.bool.must[1].match.title,
    ).toBe(title);
    expect(
      mockedGetAllOrganizations.mock.calls[0][0].query.bool.must[2].match[
        'Organization.type'
      ],
    ).toBe(type);
  });
});
