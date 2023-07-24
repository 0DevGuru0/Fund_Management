import { getBackendPrisma } from '$data/prisma';
import { changeToRealCurrencyString } from '$service/currencies/changeToRealCurrencyString';
import { BadRequestError, NotFoundError } from '$service/errors';

import { Budget } from './budgetDto';

import { BudgetAllocationStatus } from '.prisma/backend-client';

export const cancelBudgetReservation = async (budgetId: string): Promise<Budget> => {
  const prisma = await getBackendPrisma();

  const budget = await prisma.budgetAllocation.findUnique({
    where: {
      id: budgetId,
    },
  });
  if (budget === null) {
    throw new NotFoundError('provided budget does not exist');
  }
  if (budget.status !== BudgetAllocationStatus.RESERVED) {
    throw new BadRequestError('provided budget is not in reserved state');
  }

  const updatedBudget = await prisma.budgetAllocation.update({
    where: {
      id: budgetId,
    },
    data: {
      status: BudgetAllocationStatus.CANCELLED,
    },
  });

  return {
    ...updatedBudget,
    originalAmount: changeToRealCurrencyString(updatedBudget.originalAmount),
    acceptedAmount:
      updatedBudget.acceptedAmount === null
        ? null
        : changeToRealCurrencyString(updatedBudget.acceptedAmount),
  };
};
