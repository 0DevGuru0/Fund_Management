import { v4 } from 'uuid';

import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { checkAuthForPolicyChange } from '$service/policies/checkAuthForPolicyChange';
import { addVouchersToPolicy } from '$service/vouchers/addVouchersToPolicy';
import {
  CreateVoucherInput,
  createVoucherInputDto,
} from '$service/vouchers/createVoucherInputDto';

interface Query {
  policyId: string;
  [key: string]: string | string[];
}

interface Body {
  vouchers: CreateVoucherInput[];
  batchId: string;
}

interface Response {
  additionCount: number;
}

const addVouchersToPolicyApi: ApiHandler<Body, Response, Query> = async (
  req,
  res,
  ctx,
) => {
  const { policyId } = req.query;
  const { vouchers, batchId: providedBatchId } = req.body;
  const batchId = providedBatchId ?? v4();
  const operator = ctx.userToken.preferred_username!;

  return addVouchersToPolicy({
    vouchers,
    policyId,
    batchId,
    operator,
  });
};

export default withMiddleware(addVouchersToPolicyApi)({
  operationId: 'addVouchersToPolicy',
  method: 'POST',
  description: 'add vouchers for a specific policy',
  authorizationChecker: checkAuthForPolicyChange,
  query: {
    type: 'object',
    properties: {
      policyId: {
        type: 'string',
        format: 'uuid',
        openApiIn: 'path',
      },
    },
    required: ['policyId'],
  },
  body: {
    type: 'object',
    properties: {
      vouchers: {
        type: 'array',
        items: createVoucherInputDto,
        minItems: 1,
      },
      batchId: {
        type: 'string',
        format: 'uuid',
      },
    },
    required: ['vouchers'],
  },
  response: {
    type: 'object',
    properties: {
      additionCount: {
        type: 'integer',
        nullable: true,
      },
    },
  },
});
