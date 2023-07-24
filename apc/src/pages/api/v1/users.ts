import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { userDto, UserDto } from '$service/user/usersDto';

import { getAllUsers } from '../../../service/user/getAllUsers';

interface Query {
  usernames: string;
  [key: string]: string | string[];
}
const getUsersApi: ApiHandler<any, UserDto[], Query> = async (req, res, ctx) => {
  const { usernames } = req.query;

  return getAllUsers(usernames.split(','));
};

export default withMiddleware(getUsersApi)({
  operationId: 'getUsersApi',
  description: 'Get users detail from Keycloak',
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      usernames: {
        type: 'string',
        openApiIn: 'query',
        example: 'demo,fundmanager1',
      },
    },
    required: ['usernames'],
  },
  response: {
    description: 'Returns users detail',
    type: 'array',
    items: userDto,
  },
});
