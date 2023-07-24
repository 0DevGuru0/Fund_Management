import { JSONSchemaType } from '$service/validator/ajvTypes';

import { BudgetAllocation } from '.prisma/backend-client';

export type Budget = Omit<BudgetAllocation, 'originalAmount' | 'acceptedAmount'> & {
  originalAmount: string;
  acceptedAmount: string | null;
};

export const budgetDto: JSONSchemaType<Budget> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['RESERVED', 'ALLOCATED', 'CANCELLED'],
    },
    note: {
      type: 'string',
    },
    createdAt: {
      type: 'object',
    },
    policyId: {
      type: 'string',
    },
    fundApplicationId: {
      type: 'number',
    },
    originalAmount: {
      type: 'string',
    },
    acceptedAmount: {
      type: 'string',
      nullable: true,
    },
    currency: {
      type: 'string',
    },
    paymentRecordId: {
      type: 'string',
    },
  },
  required: [
    'id',
    'note',
    'status',
    'createdAt',
    'policyId',
    'fundApplicationId',
    'originalAmount',
    'currency',
    'paymentRecordId',
  ],
};
