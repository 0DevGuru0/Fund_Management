import { getBackendPrisma } from '$data/prisma';
import { changeToMicroCurrency } from '$service/currencies/changeToMicroCurrency';
import { BadRequestError, NotFoundError } from '$service/errors';

import { CreatePaymentRecordInput } from './createPaymentRecordInputDto';

import { BudgetAllocationStatus, PaymentRecord, Prisma } from '.prisma/backend-client';

type Parameters = Omit<CreatePaymentRecordInput, 'accountDetails' | 'receipt'> & {
  accountDetails: Prisma.InputJsonValue;
  receipt: Prisma.InputJsonValue;
};

export const createPaymentRecord = async (
  budgetId: string,
  paymentRecord: Parameters,
): Promise<PaymentRecord> => {
  const { amount, paidAt } = paymentRecord;

  const fractionalAmount = changeToMicroCurrency(amount);

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

  const [createdPaymentRecord] = await prisma.$transaction([
    prisma.paymentRecord.create({
      data: {
        ...paymentRecord,
        amount: fractionalAmount,
        paidAt,
        budgetAllocation: {
          connect: {
            id: budgetId,
          },
        },
      },
    }),
    prisma.budgetAllocation.update({
      where: {
        id: budgetId,
      },
      data: {
        status: BudgetAllocationStatus.ALLOCATED,
        acceptedAmount: fractionalAmount,
      },
    }),
  ]);

  return createdPaymentRecord;
};
