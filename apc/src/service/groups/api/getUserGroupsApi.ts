import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { GroupDto } from '$service/generated/wfCamunda';
import { getUserGroups } from '$service/groups/getUserGroups';

interface Query {
  username: string;
  [key: string]: string | string[];
}

// TODO: Admin Only API
const getGroupsApi: ApiHandler<any, GroupDto[], Query> = async (req, res, ctx) => {
  const { username } = req.query;
  return getUserGroups(username, req);
};

export default withMiddleware(getGroupsApi)({
  operationId: 'getGroupsOfUser',
  description: 'returns all the groups of the user',
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        openApiIn: 'path',
      },
    },
  },
  response: {
    type: 'array',
    items: {
      type: 'object',
      $ref: '#/components/schemas/GroupDto',
    },
  },
});
