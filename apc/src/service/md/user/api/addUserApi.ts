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

  await prisma.userMD.create({
    data: {
      username,
      password,
    },
  });
  return true;
};

export default withMiddleware(getUserApi)({
  operationId: 'addUser',
  description: 'add user',
  method: 'POST',
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
