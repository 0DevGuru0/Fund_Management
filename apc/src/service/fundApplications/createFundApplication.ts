import { getBackendPrisma } from '$data/prisma';
import { changeToMicroCurrency } from '$service/currencies/changeToMicroCurrency';

import { CreateFundApplicationInput } from './createFundApplicationInputDto';

export const createFundApplication = async (
  data: CreateFundApplicationInput,
): Promise<string> => {
  const prisma = await getBackendPrisma();
  const { publishPrice } = data;
  const fractionalPublishPrice = changeToMicroCurrency(publishPrice);

  const { id: fundApplicationId } = await prisma.fundApplication.create({
    data: { ...data, variables: {}, publishPrice: fractionalPublishPrice },
    select: {
      id: true,
    },
  });

  return fundApplicationId.toString();
};
