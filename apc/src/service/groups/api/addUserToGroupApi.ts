import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { GroupDto } from '$service/generated/wfCamunda';

import { addUserToGroup } from '../addUserToGroup';
import { getUserGroups } from '../getUserGroups';
import { Role, roles } from '../Role';

interface Query {
  username: string;
  [key: string]: string | string[];
}

interface Body {
  type: keyof typeof Role;
  organizationId: string;
}

const addUserToGroupApi: ApiHandler<Body, GroupDto[], Query> = async (req, res, ctx) => {
  const { username } = req.query;
  const group = req.body;

  await addUserToGroup(username, group, req);

  const groups = await getUserGroups(username, req);

  return groups;
};

export default withMiddleware(addUserToGroupApi)({
  operationId: 'addUserToGroups',
  description: 'Adds user to the provided group (role) both in Camunda and Keycloak',
  method: 'POST',
  roles: [Role.SystemAdmin],
  query: {
    type: 'object',
    properties: {
      username: { type: 'string', openApiIn: 'path' },
    },
  },
  body: {
    type: 'object',
    properties: {
      type: { type: 'string', enum: roles },
      organizationId: { type: 'string' },
    },
    required: ['type'],
  },
  response: {
    description: 'Returns provided user groups',
    type: 'array',
    items: {
      type: 'object',
      $ref: '#/components/schemas/GroupDto',
    },
  },
});
