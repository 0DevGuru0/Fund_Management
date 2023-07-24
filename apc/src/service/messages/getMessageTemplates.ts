import { getBackendPrisma } from '$data/prisma';

import { MessageTemplate } from './messageTemplateDto';

import { Prisma } from '.prisma/backend-client';

interface Parameters {
  limit: number;
  skip: number;
  id?: string;
  search?: string;
}

export interface Result {
  messageTemplates: MessageTemplate[];
  count: number;
}

export const getMessageTemplates = async (parameters: Parameters): Promise<Result> => {
  const { limit, skip, id, search } = parameters;
  const prisma = await getBackendPrisma();

  const where: Prisma.MessageTemplateWhereInput = {
    id,
  };
  if (search) {
    where.OR = [
      {
        body: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        id: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ];
  }

  const [count, messageTemplates] = await Promise.all([
    prisma.messageTemplate.count({
      where,
    }),
    prisma.messageTemplate.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        id: 'desc',
      },
    }),
  ]);

  return {
    messageTemplates: (messageTemplates as unknown) as MessageTemplate[],
    count,
  };
};
