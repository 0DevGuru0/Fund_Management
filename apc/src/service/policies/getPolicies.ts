import { keyBy, uniq } from 'lodash';

import { getBackendPrisma } from '$data/prisma';
import { GetAllOrganizationsItem } from '$service/organizations/getAllOrganizationsItemDto';
import { getOrganizations } from '$service/organizations/getOrganizations';

import {
  JournalGroupsOfPolicy,
  Policy,
  PolicyType,
  Prisma,
  VoucherStatus,
} from '.prisma/backend-client';

interface Parameters {
  limit: number;
  skip: number;
  id?: string;
  type?: PolicyType;
  title?: string;
  fundIds?: string[];
  journalGroupId?: string;
  isActive?: 'true' | 'false';
  journalId?: string;
  fieldsArray?: string[];
  hasAvailableVoucher?: 'true' | 'false';
}

export interface Result {
  policies: (Policy & { fund?: GetAllOrganizationsItem } & {
    journalGroups?: JournalGroupsOfPolicy[];
  })[];
  activeCount: number;
  inactiveCount: number;
}

export const getPolicies = async (parameters: Parameters): Promise<Result> => {
  const {
    limit,
    skip,
    id,
    type,
    title,
    fundIds,
    journalGroupId,
    isActive,
    journalId,
    fieldsArray,
    hasAvailableVoucher,
  } = parameters;
  const prisma = await getBackendPrisma();

  const where: Prisma.PolicyWhereInput = {
    id,
    type,
  };
  if (fundIds) {
    where.fundId = {
      in: fundIds,
    };
  }
  if (title) {
    where.title = {
      contains: title,
      mode: 'insensitive',
    };
  }
  if (journalGroupId) {
    where.journalGroups = {
      some: {
        journalGroupId,
      },
    };
  }
  if (isActive) {
    where.isActive = isActive === 'true' ? true : false;
  }
  if (hasAvailableVoucher === 'true') {
    where.OR = [
      {
        type: PolicyType.VOUCHER,
        vouchers: {
          some: {
            status: VoucherStatus.AVAILABLE,
          },
        },
      },
      {
        type: PolicyType.INVOICE,
      },
    ];
  }
  if (journalId) {
    where.journalGroups = {
      some: {
        journalGroup: {
          journals: {
            some: {
              journalId,
            },
          },
        },
      },
    };
  }

  const include: Prisma.PolicyInclude = {};
  if (fieldsArray?.includes('journalGroups')) {
    include.journalGroups = {
      include: {
        journalGroup: true,
      },
    };
  }

  const [activeCount, inactiveCount, policies] = await Promise.all([
    prisma.policy.count({
      where: { ...where, isActive: true },
    }),
    prisma.policy.count({
      where: { ...where, isActive: false },
    }),
    prisma.policy.findMany({
      where,
      skip,
      take: limit,
      include: Object.keys(include).length > 0 ? include : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ]);
  const result: Result = {
    policies,
    activeCount,
    inactiveCount,
  };

  if (fieldsArray?.includes('fundDetails')) {
    const resultedFundIds = result.policies.map((policy) => policy.fundId);
    const uniqueResultedFundIds = uniq(resultedFundIds);
    const funds = await getOrganizations({
      ids: uniqueResultedFundIds,
      type: 'Fund',
      limit: uniqueResultedFundIds.length,
      skip: 0,
    });
    const fundsById = keyBy(funds, (fund) => fund.id);
    result.policies.forEach((policy) => {
      policy.fund = fundsById[policy.fundId];
    });
  }

  return result;
};
