import { v4 as uuidv4 } from 'uuid';

import { getBackendPrisma } from '$data/prisma';
import { sysLog } from '$service/logger';

import { Voucher, VoucherStatus } from '.prisma/backend-client';

export const getVouchers = async (): Promise<Voucher[]> => {
  const prisma = await getBackendPrisma();
  const vouchers = await prisma.voucher.findMany();
  sysLog.info('vouchers called: ', vouchers);

  return [
    {
      id: '1',
      status: VoucherStatus.AVAILABLE,
      code: 'sj3-3422kss',
      policyId: uuidv4(),
      publisherId: 'Elsevier',
      batchId: uuidv4(),
      usableAfter: null,
      expiresAt: null,
      allocatedAt: null,
      lastReservedAt: null,
      note: null,
      fundApplicationId: null,
      createdAt: new Date(),
    },
    {
      id: '2',
      status: VoucherStatus.RESERVED,
      code: 'sj3-3422kss',
      policyId: uuidv4(),
      publisherId: 'Springer Nature',
      batchId: uuidv4(),
      usableAfter: null,
      expiresAt: null,
      allocatedAt: null,
      lastReservedAt: null,
      note: null,
      fundApplicationId: null,
      createdAt: new Date(),
    },
  ];
};
