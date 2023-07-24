import { getBackendPrisma } from '$data/prisma';
import { NotFoundError } from '$service/errors';

import { FundApplication, Prisma } from '.prisma/backend-client';

export interface UpdateFundApplicationInput {
  variables?: Record<string, any>;
  state?: string;
}

export const updateFundApplication = async (
  fundApplicationId: number,
  data: UpdateFundApplicationInput,
): Promise<FundApplication> => {
  const prisma = await getBackendPrisma();

  const fundApplication = await prisma.fundApplication.findUnique({
    where: {
      id: fundApplicationId,
    },
  });
  if (fundApplication === null) {
    throw new NotFoundError('provided fundApplication does not exist');
  }

  const { state, variables } = data;

  return prisma.fundApplication.update({
    where: {
      id: fundApplicationId,
    },
    data: {
      state: state ?? fundApplication.state,
      variables: {
        ...(fundApplication.variables as Prisma.JsonObject),
        ...variables,
      },
    },
  });
};
