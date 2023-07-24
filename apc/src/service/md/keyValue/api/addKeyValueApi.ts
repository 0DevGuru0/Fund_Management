import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getBackendPrisma } from '$data/prisma';

interface Query {
  key: string;
  value: string;
  [key: string]: string | string[];
}

const addKeyValueApi: ApiHandler<any, boolean, Query> = async (req) => {
  const { key, value } = req.query;
  const prisma = await getBackendPrisma();

  await prisma.keyValueMD.create({
    data: {
      key,
      value,
    },
  });
  return true;
};

export default withMiddleware(addKeyValueApi)({
  operationId: 'addKeyValue',
  description: 'add key-value',
  method: 'POST',
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        openApiIn: 'query',
      },
      value: {
        type: 'string',
        openApiIn: 'query',
      },
    },
    required: ['key', 'value'],
  },
  response: {
    type: 'boolean',
  },
});
