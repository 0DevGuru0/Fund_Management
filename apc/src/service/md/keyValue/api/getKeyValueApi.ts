import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getBackendPrisma } from '$data/prisma';
import { NotFoundError } from '$service/errors';

interface Query {
  key: string;
  [key: string]: string | string[];
}

const getKeyValueApi: ApiHandler<any, string, Query> = async (req) => {
  const { key } = req.query;
  const prisma = await getBackendPrisma();

  const keyValue = await prisma.keyValueMD.findUnique({
    where: {
      key,
    },
  });
  if (keyValue) {
    return keyValue.value;
  }
  throw new NotFoundError('there is no value for this key');
};

export default withMiddleware(getKeyValueApi)({
  operationId: 'getKeyValue',
  description: 'get key-value',
  method: 'GET',
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        openApiIn: 'query',
      },
    },
    required: ['key'],
  },
  response: {
    type: 'string',
  },
});
