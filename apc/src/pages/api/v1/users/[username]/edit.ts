import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';

import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { checkAuthForEditUser } from '$service/user/checkAuthForEditUser';
import { editUser, EditUserInput } from '$service/user/editUser';

interface Query {
  username: string;
  [key: string]: string | string[];
}
const editUserApi: ApiHandler<EditUserInput, UserRepresentation, Query> = async (
  req,
  res,
  ctx,
) => {
  const { username } = req.query;

  const user = await editUser(username, req.body);

  return user;
};

export default withMiddleware(editUserApi)({
  operationId: 'editUserApi',
  description: 'Edit single user in Keycloak',
  method: 'PUT',
  authorizationChecker: checkAuthForEditUser,
  query: {
    type: 'object',
    properties: {
      username: { type: 'string', openApiIn: 'path' },
    },
  },
  body: {
    type: 'object',
    properties: {
      firstName: { type: 'string', minLength: 3 },
      lastName: { type: 'string', minLength: 3 },
      email: { type: 'string', format: 'email' },
      attributes: {
        type: 'object',
        properties: {
          phoneNumber: { type: 'string', pattern: '^$|^[+][0-9]+$' },
          country: { type: 'string' },
          gender: { type: 'string' },
          orcid: {
            type: 'string',
            pattern: '^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}[0-9X]$',
          },
          defaultAffiliation: { type: 'string' },
          picture: { type: 'string', format: 'uri' },
        },
      },
    },
  },
  response: {
    description: 'Returns updated user',
    type: 'object',
  },
});
