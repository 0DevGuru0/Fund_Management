import { getBackendPrisma } from '$data/prisma';
import { BadRequestError, NotFoundError } from '$service/errors';

import { PolicyType, Voucher, VoucherStatus } from '.prisma/backend-client';

export const reserveVoucher = async (fundApplicationId: number): Promise<Voucher> => {
  const prisma = await getBackendPrisma();

  const fundApplication = await prisma.fundApplication.findUnique({
    where: {
      id: fundApplicationId,
    },
    include: {
      policy: {
        include: {
          vouchers: {
            where: {
              status: VoucherStatus.AVAILABLE,
            },
            take: 1,
          },
        },
      },
    },
  });

  if (fundApplication == null) {
    throw new NotFoundError('such fund application does not exist');
  }

  const { policy } = fundApplication;
  if (policy.type !== PolicyType.VOUCHER) {
    throw new BadRequestError('policy type is not voucher');
  }
  if (policy.vouchers.length === 0) {
    throw new NotFoundError('there is no available voucher for this policy');
  }

  let voucher = policy.vouchers[0];
  voucher = await prisma.voucher.update({
    where: {
      id: voucher.id,
    },
    data: {
      status: VoucherStatus.RESERVED,
      fundApplicationId,
      lastReservedAt: new Date(),
    },
  });

  return voucher;
};
