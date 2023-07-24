import { Budget, budgetDto } from '$service/budgets/budgetDto';
import { policyDto } from '$service/policies/policyDto';
import { JSONSchemaType } from '$service/validator/ajvTypes';
import { voucherDto } from '$service/vouchers/voucherDto';

import {
  FundApplication as TypeWeakFundApplication,
  Policy,
  Voucher,
} from '.prisma/backend-client';

export type FundApplicationDto = Omit<TypeWeakFundApplication, 'publishPrice'> & {
  voucher?: Voucher;
  policy?: Policy;
  budgetAllocation?: Budget;
  publishPrice: string;
};

export const fundApplicationDto: JSONSchemaType<FundApplicationDto> = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    articleTitle: { type: 'string' },
    articleFile: {
      type: 'object',
    },
    userId: { type: 'string' },
    policyId: { type: 'string' },
    processInstanceId: { type: 'string' },
    fundId: { type: 'string' },
    publisherId: { type: 'string' },
    journalId: { type: 'string' },
    affiliationId: { type: 'string' },
    publishPrice: { type: 'string' },
    currency: { type: 'string' },
    createdAt: {
      type: 'object',
    },
    state: { type: 'string' },
    variables: { type: 'object' },
    voucher: { ...voucherDto, nullable: true },
    policy: { ...policyDto, nullable: true },
    budgetAllocation: { ...budgetDto, nullable: true },
  },
};
