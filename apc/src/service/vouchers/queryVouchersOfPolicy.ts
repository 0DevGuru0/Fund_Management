import { flow, isEmpty, keyBy, mapValues } from 'lodash';

import { getBackendPrisma } from '$data/prisma';
import { BadRequestError } from '$service/errors';

import { Voucher, VoucherStatus, Prisma } from '.prisma/backend-client';

interface Parameters {
  code?: string;
  policyId?: string;
  fundApplicationIds?: string[];
  status?: VoucherStatus;
  skip: number;
  limit: number;
}

interface VoucherCounts {
  AVAILABLE: number;
  RESERVED: number;
  ALLOCATED: number;
  SUSPENDED: number;
}
export interface Result {
  vouchers: Voucher[];
  counts: VoucherCounts;
}

export const queryVouchersOfPolicy = async (parameters: Parameters): Promise<Result> => {
  const { code, policyId, status, skip, limit, fundApplicationIds } = parameters;
  const prisma = await getBackendPrisma();

  if (fundApplicationIds?.some((id) => isNaN(+id))) {
    throw new BadRequestError('fundApplicationIds should just include numbers');
  }
  const where: Prisma.VoucherWhereInput = {
    policyId,
    status,
  };

  const fundApplicationIdNumbers = fundApplicationIds!.map((id) => +id);
  if (!isEmpty(fundApplicationIdNumbers)) {
    where.fundApplicationId = {
      in: fundApplicationIdNumbers,
    };
  }

  if (code) {
    where.code = {
      contains: code,
    };
  }

  const [vouchers, countIdsByStatus] = await Promise.all([
    prisma.voucher.findMany({
      where,
      skip,
      take: limit,
    }),
    prisma.voucher.groupBy({
      by: ['status'],
      where: {
        ...where,
        status: undefined,
      },
      _count: {
        id: true,
      },
    }),
  ]);

  const countByStatus = flow(
    (counts) => keyBy(counts, 'status'),
    (counts) => mapValues(counts, (count) => count._count.id),
  )(countIdsByStatus);

  return {
    vouchers,
    counts: {
      AVAILABLE: countByStatus.AVAILABLE ?? 0,
      RESERVED: countByStatus.RESERVED ?? 0,
      ALLOCATED: countByStatus.ALLOCATED ?? 0,
      SUSPENDED: countByStatus.SUSPENDED ?? 0,
    },
  };
};
