import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { partialJournalGroupsOfPolicyDto } from '$service/journalGroupsOfPolicy/journalGroupsOfPolicyDto';
import { partialPolicyDto } from '$service/policies/policyDto';
import { parseQueryLimitAndSkip } from '$service/util/parseQueryLimitAndSkip';

import { getPolicies, Result } from '../getPolicies';

import { PolicyType } from '.prisma/backend-client';

interface Query {
  limit: string;
  skip: string;
  id: string;
  type: PolicyType;
  title: string;
  fundId: string;
  journalGroupId: string;
  isActive: 'true' | 'false';
  journalId: string;
  fields: string;
  hasAvailableVoucher: 'true' | 'false';
  [key: string]: string | string[];
}

const getPoliciesApi: ApiHandler<any, Result, Query> = async (req, res, ctx) => {
  const { fields } = req.query;
  const { limit, skip } = parseQueryLimitAndSkip(req.query);
  const fieldsArray = fields ? fields.split(',') : [];

  return getPolicies({
    ...req.query,
    limit,
    skip,
    fieldsArray,
  });
};

export default withMiddleware(getPoliciesApi)({
  operationId: 'getPolicies',
  description: 'getting policies',
  method: 'GET',
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      limit: {
        type: 'string',
        openApiIn: 'query',
      },
      skip: {
        type: 'string',
        openApiIn: 'query',
      },
      id: {
        type: 'string',
        openApiIn: 'query',
      },
      type: {
        type: 'string',
        enum: ['VOUCHER', 'MANUAL', 'INVOICE'],
        openApiIn: 'query',
      },
      title: {
        type: 'string',
        openApiIn: 'query',
      },
      fundId: {
        type: 'string',
        openApiIn: 'query',
      },
      journalGroupId: {
        type: 'string',
        openApiIn: 'query',
      },
      isActive: {
        type: 'string',
        enum: ['true', 'false'],
        openApiIn: 'query',
      },
      journalId: {
        type: 'string',
        openApiIn: 'query',
      },
      fields: {
        type: 'string',
        openApiIn: 'query',
        example: 'fundDetails,journalGroups',
      },
      hasAvailableVoucher: {
        type: 'string',
        enum: ['true', 'false'],
        openApiIn: 'query',
      },
    },
  },
  response: {
    type: 'object',
    properties: {
      policies: {
        type: 'array',
        items: {
          type: 'object',
          allOf: [
            partialPolicyDto,
            {
              type: 'object',
              properties: {
                fund: {
                  type: 'object',
                  additionalProperties: true,
                  nullable: true,
                },
              },
            },
            {
              type: 'object',
              properties: {
                journalGroups: {
                  type: 'array',
                  items: partialJournalGroupsOfPolicyDto,
                  nullable: true,
                },
              },
            },
          ],
        },
        nullable: true,
      },
      activeCount: {
        type: 'integer',
        nullable: true,
      },
      inactiveCount: {
        type: 'integer',
        nullable: true,
      },
    },
  },
});
