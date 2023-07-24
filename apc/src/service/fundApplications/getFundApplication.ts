import { getBackendPrisma } from '$data/prisma';
import { changeToRealCurrencyString } from '$service/currencies/changeToRealCurrencyString';
import { TitleOrganization } from '$service/groups/getTokenRolesSplitted';
import { controlVoucherAccess } from '$service/vouchers/controlVoucherAccess';

import { FundApplicationDto } from './fundApplicationDto';

import { Prisma, PolicyType } from '.prisma/backend-client';

interface Parameters {
  policyType?: string;
  processInstanceIds?: string;
  fundApplicationIds?: string;
  fundIds?: string;
  publisherIds?: string;
  affiliationIds?: string;
  journalIds?: string;
  states?: string;
  startDate?: string;
  endDate?: string;
  fieldsArray?: string[];
  skip?: number;
  limit?: number;
  sortBy?: string;
  roles: TitleOrganization;
}

export interface Result {
  fundApplications: FundApplicationDto[];
  count: number;
  totalPrice: string;
}

export const getFundApplications = async (parameters: Parameters): Promise<Result> => {
  const {
    policyType,
    processInstanceIds,
    fundApplicationIds,
    fundIds,
    publisherIds,
    affiliationIds,
    journalIds,
    states,
    startDate,
    endDate,
    fieldsArray,
    skip,
    limit,
    sortBy,
    roles,
  } = parameters;
  const prisma = await getBackendPrisma();

  const where: Prisma.FundApplicationWhereInput = {};

  if (processInstanceIds) {
    const processInstanceIdArray = processInstanceIds.split(',');
    where.processInstanceId = {
      in: processInstanceIdArray,
    };
  }
  if (policyType) {
    where.policy = {
      type: policyType as PolicyType,
    };
  }
  if (fundApplicationIds) {
    const fundApplicationIdArray = fundApplicationIds.split(',');
    const fundApplicationIdNumbers = fundApplicationIdArray
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id));
    where.id = {
      in: fundApplicationIdNumbers,
    };
  }
  if (journalIds) {
    const journalIdArray = journalIds.split(',');
    where.journalId = {
      in: journalIdArray,
    };
  }
  if (fundIds) {
    const fundIdArray = fundIds.split(',');
    where.fundId = {
      in: fundIdArray,
    };
  }
  if (publisherIds) {
    const publisherIdArray = publisherIds.split(',');
    where.publisherId = {
      in: publisherIdArray,
    };
  }
  if (affiliationIds) {
    const affiliationIdArray = affiliationIds.split(',');
    where.affiliationId = {
      in: affiliationIdArray,
    };
  }
  if (states) {
    const stateArray = states.split(',');
    where.state = {
      in: stateArray,
    };
  }
  const createdAt: string | Prisma.DateTimeFilter | Date | undefined = {};
  if (startDate) {
    createdAt.gte = startDate;
  }
  if (endDate) {
    createdAt.lte = endDate;
  }
  where.createdAt = createdAt;

  const include: Prisma.FundApplicationInclude = {};

  if (fieldsArray?.includes('voucher')) {
    include.voucher = true;
  }
  if (fieldsArray?.includes('policy')) {
    include.policy = true;
  }
  if (fieldsArray?.includes('budgetAllocation')) {
    include.budgetAllocation = true;
  }

  const [fundApplications, count, totalPrice] = await Promise.all([
    prisma.fundApplication.findMany({
      where,
      skip,
      take: limit,
      include: Object.keys(include).length > 0 ? include : undefined,
      ...(sortBy ? { orderBy: { [sortBy]: 'desc' } } : {}),
    }),
    prisma.fundApplication.count({
      where,
    }),
    prisma.fundApplication.aggregate({
      _sum: {
        publishPrice: true,
      },
      where,
    }),
  ]);

  const realPublishPrice = changeToRealCurrencyString(totalPrice._sum.publishPrice);

  return {
    fundApplications: fundApplications.map((fundApplication) => ({
      ...fundApplication,
      publishPrice: changeToRealCurrencyString(fundApplication.publishPrice),
      voucher: controlVoucherAccess(
        roles,
        ((fundApplication as unknown) as FundApplicationDto).voucher,
      ),
    })),
    count,
    totalPrice: realPublishPrice,
  };
};
