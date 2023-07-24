import { JSONSchemaType } from '$service/validator/ajvTypes';

import { Voucher, VoucherStatus } from '.prisma/backend-client';

export const voucherDto: JSONSchemaType<Voucher> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: [
        VoucherStatus.AVAILABLE,
        VoucherStatus.RESERVED,
        VoucherStatus.ALLOCATED,
        VoucherStatus.SUSPENDED,
      ] as VoucherStatus[],
    },
    code: {
      type: 'string',
    },
    policyId: {
      type: 'string',
    },
    publisherId: {
      type: 'string',
    },
    usableAfter: {
      type: 'object',
      nullable: true,
    },
    expiresAt: {
      type: 'object',
      nullable: true,
    },
    allocatedAt: {
      type: 'object',
      nullable: true,
    },
    lastReservedAt: {
      type: 'object',
      nullable: true,
    },
    batchId: {
      type: 'string',
    },
    note: {
      type: 'string',
      nullable: true,
    },
    createdAt: {
      type: 'object',
    },
    fundApplicationId: {
      type: 'integer',
    },
  },
  required: [
    'id',
    'status',
    'code',
    'policyId',
    'publisherId',
    'batchId',
    'createdAt',
    'fundApplicationId',
  ],
};
