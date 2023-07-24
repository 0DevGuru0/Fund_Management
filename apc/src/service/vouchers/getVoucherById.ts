import { isNil } from 'lodash';

import { getBackendPrisma } from '$data/prisma';
import { NotFoundError } from '$service/errors';

import { Voucher } from '.prisma/backend-client';

interface Parameters {
  voucherId: string;
}
export const getVoucherById = async (parameter: Parameters): Promise<Voucher> => {
  const { voucherId } = parameter;

  const prisma = await getBackendPrisma();

  const voucher = await prisma.voucher.findUnique({
    where: {
      id: voucherId,
    },
  });

  if (isNil(voucher)) {
    throw new NotFoundError('No Voucher exist with this ID');
  }

  return voucher;
};
