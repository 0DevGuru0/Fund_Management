import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getBackendPrisma } from '$data/prisma';
import { partialJournalGroupDto } from '$service/journalGroups/journalGroupDto';

import { Prisma, JournalGroup } from '.prisma/backend-client';

interface Query {
  publisherId: string;
  fundId: string;
  title: string;
  [key: string]: string | string[];
}

type Response = (JournalGroup & {
  journals: {
    journalId: string;
  }[];
})[];

const getJournalGroupApi: ApiHandler<any, Response, Query> = async (req, res, ctx) => {
  const { publisherId, fundId, title } = req.query;

  const prisma = await getBackendPrisma();

  const where: Prisma.JournalGroupWhereInput = {
    publisherId,
    fundId,
  };
  if (title) {
    where.title = {
      contains: title,
    };
  }
  return prisma.journalGroup.findMany({
    where,
    include: {
      journals: {
        orderBy: {
          assignedAt: 'desc',
        },
        skip: 0,
        take: 10,
        select: {
          journalId: true,
        },
      },
    },
  });
};

export default withMiddleware(getJournalGroupApi)({
  operationId: 'getJournalGroups',
  method: 'GET',
  description: 'get all of the journal groups',
  query: {
    type: 'object',
    properties: {
      publisherId: {
        type: 'string',
        openApiIn: 'query',
      },
      fundId: {
        type: 'string',
        openApiIn: 'query',
      },
      title: {
        type: 'string',
        openApiIn: 'query',
      },
    },
  },
  response: {
    type: 'array',
    items: {
      type: 'object',
      allOf: [
        partialJournalGroupDto,
        {
          type: 'object',
          properties: {
            journals: {
              type: 'array',
              items: { type: 'object', properties: { journalId: { type: 'string' } } },
            },
          },
        },
      ],
    },
  },
});
