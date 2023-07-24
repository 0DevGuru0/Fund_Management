import { getBackendPrisma } from '$data/prisma';
import { changeToMicroCurrency } from '$service/currencies/changeToMicroCurrency';
import { Currency } from '$service/currencies/Currency';
import { BadRequestError, NotFoundError } from '$service/errors';

import {
  BudgetAllocation,
  BudgetAllocationStatus,
  PolicyType,
} from '.prisma/backend-client';

interface Parameters {
  fundApplicationId: number;
  currency: Currency;
  note?: string;
  amount: number;
}

export const reserveBudget = async (
  parameters: Parameters,
): Promise<BudgetAllocation> => {
  const { currency, note, amount, fundApplicationId } = parameters;
  const fractionalAmount = changeToMicroCurrency(amount);

  const prisma = await getBackendPrisma();

  const fundApplication = await prisma.fundApplication.findUnique({
    where: {
      id: fundApplicationId,
    },
    include: {
      policy: {
        select: {
          type: true,
        },
      },
    },
  });
  if (fundApplication === null) {
    throw new NotFoundError('provided fund application does not exist');
  }
  if (fundApplication.policy.type !== PolicyType.INVOICE) {
    throw new BadRequestError(
      'provided fund application is not associated with a policy of type INVOICE',
    );
  }

  return prisma.budgetAllocation.create({
    data: {
      status: BudgetAllocationStatus.RESERVED,
      currency,
      originalAmount: fractionalAmount,
      note,
      policyId: fundApplication.policyId,
      fundApplicationId,
    },
  });
};
