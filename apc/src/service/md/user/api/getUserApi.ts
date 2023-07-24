import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getBackendPrisma } from '$data/prisma';

interface Query {
  username: string;
  password: string;
  [key: string]: string | string[];
}

const getUserApi: ApiHandler<any, boolean, Query> = async (req) => {
  const { username, password } = req.query;
  const prisma = await getBackendPrisma();

  const users = await prisma.userMD.findMany({
    where: {
      username,
      password,
    },
  });
  return users.length > 0;
};

export default withMiddleware(getUserApi)({
  operationId: 'getUser',
  description: 'get user',
  method: 'GET',
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        openApiIn: 'query',
      },
      password: {
        type: 'string',
        openApiIn: 'query',
      },
    },
    required: ['username', 'password'],
  },
  response: {
    type: 'boolean',
  },
});
