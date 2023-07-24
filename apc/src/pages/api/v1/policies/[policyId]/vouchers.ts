import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { Role } from '$service/groups/Role';
import { convertQueryStringToArray } from '$service/util/convertQueryStringToArray';
import { parseQueryLimitAndSkip } from '$service/util/parseQueryLimitAndSkip';
import { queryVouchersOfPolicy, Result } from '$service/vouchers/queryVouchersOfPolicy';
import { voucherDto } from '$service/vouchers/voucherDto';

import { VoucherStatus } from '.prisma/backend-client';

interface Query {
  code: string;
  policyId: string;
  status: VoucherStatus;
  limit: string;
  skip: string;
  fundApplicationIds: string;
  [key: string]: string | string[];
}

type Response = Result;

const queryVouchersOfPolicyApi: ApiHandler<Body, Response, Query> = async (req, res) => {
  const { code, policyId, status, fundApplicationIds } = req.query;

  const { limit, skip } = parseQueryLimitAndSkip(req.query);

  const fundApplicationIdsArray = convertQueryStringToArray(fundApplicationIds);

  return queryVouchersOfPolicy({
    code,
    policyId,
    status,
    limit,
    skip,
    fundApplicationIds: fundApplicationIdsArray,
  });
};

export default withMiddleware(queryVouchersOfPolicyApi)({
  operationId: 'getVouchersOfPolicy',
  description: 'Get the list of vouchers for a policy',
  roles: [Role.FundFinancialManager, Role.FundManager, Role.SystemAdmin],
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      fundApplicationIds: {
        type: 'string',
        openApiIn: 'query',
      },
      code: {
        type: 'string',
        openApiIn: 'query',
      },
      policyId: {
        type: 'string',
        openApiIn: 'path',
      },
      status: {
        type: 'string',
        openApiIn: 'query',
        enum: ['ALLOCATED', 'AVAILABLE', 'RESERVED', 'SUSPENDED'],
      },
      limit: { type: 'string', format: 'int32', openApiIn: 'query' },
      skip: { type: 'string', format: 'int32', openApiIn: 'query' },
    },
    required: ['policyId'],
  },
  response: {
    type: 'object',
    properties: {
      vouchers: {
        type: 'array',
        items: voucherDto,
      },
      counts: {
        type: 'object',
        properties: {
          AVAILABLE: {
            type: 'integer',
            nullable: true,
          },
          RESERVED: {
            type: 'integer',
            nullable: true,
          },
          ALLOCATED: {
            type: 'integer',
            nullable: true,
          },
          SUSPENDED: {
            type: 'integer',
            nullable: true,
          },
        },
      },
    },
  },
});
