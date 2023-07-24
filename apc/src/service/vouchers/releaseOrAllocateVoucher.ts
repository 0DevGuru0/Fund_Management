import { getBackendPrisma } from '$data/prisma';
import { BadRequestError, NotFoundError } from '$service/errors';

import { Voucher, VoucherStatus } from '.prisma/backend-client';

export enum VoucherNextStatus {
  ALLOCATED,
  RELEASED,
}

export const releaseOrAllocateVoucher = async (
  voucherId: string,
  status: VoucherNextStatus,
): Promise<Voucher> => {
  const prisma = await getBackendPrisma();

  let voucher = await prisma.voucher.findUnique({
    where: {
      id: voucherId,
    },
  });
  if (voucher == null) {
    throw new NotFoundError('such voucher does not exist');
  }
  if (voucher.status !== VoucherStatus.RESERVED) {
    throw new BadRequestError('this voucher is not in RESERVED state');
  }

  voucher = await prisma.voucher.update({
    where: {
      id: voucherId,
    },
    data: {
      status:
        status === VoucherNextStatus.ALLOCATED
          ? VoucherStatus.ALLOCATED
          : VoucherStatus.AVAILABLE,
    },
  });

  return voucher;
};
