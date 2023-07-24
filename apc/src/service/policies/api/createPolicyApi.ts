import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { checkAuthForUsingFundId } from '$service/organizations/checkAuthForUsingFundId';
import { createPolicy } from '$service/policies/createPolicy';
import { policyDto } from '$service/policies/policyDto';

import { Policy, PolicyType } from '.prisma/backend-client';

interface Query {
  [key: string]: string | string[];
}

interface Body {
  type: PolicyType;
  title: string;
  fundId: string;
  terms: string;
  isActive?: boolean;
  note: string;
  publisherId?: string | null;
  journalGroupIds?: string[];
}

const createPolicyApi: ApiHandler<Body, Policy, Query> = async (req, res, ctx) => {
  return createPolicy(
    {
      ...req.body,
      createdBy: ctx.userToken.preferred_username!,
    },
    req.headers.authorization!,
  );
};

export default withMiddleware(createPolicyApi)({
  operationId: 'addPolicy',
  method: 'POST',
  description: 'creates a policy',
  authorizationChecker: checkAuthForUsingFundId,
  body: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['VOUCHER', 'INVOICE', 'MANUAL'],
      },
      title: {
        type: 'string',
      },
      fundId: {
        type: 'string',
      },
      terms: {
        type: 'string',
      },
      isActive: {
        type: 'boolean',
        nullable: true,
      },
      note: {
        type: 'string',
      },
      publisherId: {
        type: 'string',
        nullable: true,
      },
      journalGroupIds: {
        type: 'array',
        items: {
          type: 'string',
          format: 'uuid',
        },
        nullable: true,
      },
    },
    required: ['type', 'title', 'fundId', 'terms', 'note'],
    if: {
      properties: {
        type: {
          type: 'string',
          enum: ['VOUCHER'],
        },
      },
    },
    then: {
      required: ['publisherId'],
    },
  },
  response: policyDto,
});
