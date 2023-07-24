import { isEmpty } from 'lodash';

import { getBackendPrisma } from '$data/prisma';
import { NotFoundError } from '$service/errors';

export interface Result {
  message: string;
  id: string;
}
export const deleteMessageTemplate = async (id: string): Promise<Result> => {
  const prisma = await getBackendPrisma();

  const message = await prisma.messageTemplate.findUnique({
    where: {
      id,
    },
  });

  if (isEmpty(message)) {
    throw new NotFoundError(`No Message found with id ${id}`);
  }

  await prisma.messageTemplate.delete({
    where: {
      id,
    },
  });

  return { message: `Message with id ${id} has been deleted!`, id };
};
