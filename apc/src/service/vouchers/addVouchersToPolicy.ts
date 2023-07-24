import { difference, uniq } from 'lodash';

import { GetOrganizationsType } from '$application/lib/generated/apcApi.schemas';
import { getBackendPrisma } from '$data/prisma';
import { BadRequestError, NotFoundError } from '$service/errors';
import { getOrganizations } from '$service/organizations/getOrganizations';

import { CreateVoucherInput } from './createVoucherInputDto';

import { PolicyType, VoucherStatus } from '.prisma/backend-client';

interface Parameters {
  vouchers: CreateVoucherInput[];
  policyId: string;
  batchId: string;
  operator: string;
}

interface Result {
  additionCount: number;
}

export const addVouchersToPolicy = async ({
  vouchers,
  policyId,
  batchId,
  operator,
}: Parameters): Promise<Result> => {
  const prisma = await getBackendPrisma();

  const providedPublisherIds = vouchers.map((voucher) => voucher.publisherId);
  const uniqueProvidedPublisherIds = uniq(providedPublisherIds);

  const [policy, publishers] = await Promise.all([
    prisma.policy.findUnique({
      where: {
        id: policyId,
      },
    }),
    getOrganizations({
      limit: uniqueProvidedPublisherIds.length,
      skip: 0,
      type: GetOrganizationsType.Publisher,
      ids: uniqueProvidedPublisherIds,
    }),
  ]);

  const errors: { message: string; items?: string[] }[] = [];
  if (policy == null) {
    errors.push({ message: 'provided policy does not exit' });
  }
  if (publishers.length < uniqueProvidedPublisherIds.length) {
    const availablePublisherIds = publishers.map((publisher) => publisher.id);
    const unavailablePublisherIds = difference(
      uniqueProvidedPublisherIds,
      availablePublisherIds,
    );
    errors.push({
      message: 'some of the provided publishers do not exist in our repository',
      items: unavailablePublisherIds,
    });
  }
  if (errors.length > 0) {
    throw new NotFoundError(undefined, { extensions: errors });
  }

  if (policy!.type !== PolicyType.VOUCHER) {
    throw new BadRequestError('provided policy is not a voucher type');
  }

  const { count } = await prisma.voucher.createMany({
    data: vouchers.map((voucher) => ({
      ...voucher,
      status: VoucherStatus.AVAILABLE,
      policyId,
      batchId,
    })),
  });

  await prisma.batchDetails.create({
    data: {
      batchId,
      operator,
    },
  });

  return { additionCount: count };
};
