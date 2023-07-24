import { getBackendPrisma } from '$data/prisma';
import { BadRequestError, NotFoundError } from '$service/errors';

import { Policy } from '.prisma/backend-client';

interface Parameters {
  policyId: string;
  isActive: boolean;
}

export const updatePolicy = async (parameters: Parameters): Promise<Policy> => {
  const { policyId, isActive } = parameters;
  const prisma = await getBackendPrisma();

  const policy = await prisma.policy.findUnique({
    where: {
      id: policyId,
    },
  });
  if (policy === null) {
    throw new NotFoundError('provided policy does not exist');
  }
  if (policy.isActive === isActive) {
    throw new BadRequestError('provided isActive make no change to policy');
  }

  return prisma.policy.update({
    where: {
      id: policyId,
    },
    data: {
      isActive,
    },
  });
};
