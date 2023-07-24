import { JSONSchemaType } from '$service/validator/ajvTypes';

import { Policy } from '.prisma/backend-client';

export const policyDto: JSONSchemaType<Policy> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
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
    publisherId: {
      type: 'string',
      nullable: true,
    },
    terms: {
      type: 'string',
    },
    isActive: {
      type: 'boolean',
    },
    note: {
      type: 'string',
    },
    createdBy: {
      type: 'string',
    },
    createdAt: {
      type: 'object',
    },
  },
  required: [
    'id',
    'type',
    'title',
    'fundId',
    'terms',
    'isActive',
    'note',
    'createdBy',
    'createdAt',
  ],
};

export const partialPolicyDto = policyDto as JSONSchemaType<Policy, true>;
