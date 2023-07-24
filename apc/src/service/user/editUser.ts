import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import { isEmpty } from 'lodash';

import { NotFoundError } from '$service/errors';
import { getKeycloakAdminClient } from '$service/groups/getKeycloakAdminClient';

export interface EditUserInput {
  firstName: string;
  lastName: string;
  email: string;
  attributes: {
    phoneNumber: string;
    country: string;
    gender: string;
    orcid: string;
    defaultAffiliation: string;
    picture: string;
  };
}
export const editUser = async (
  username: string,
  body: EditUserInput,
): Promise<UserRepresentation> => {
  const kcAdmin = await getKeycloakAdminClient();

  // get user from keycloak

  const user = await kcAdmin.users.find({
    username,
  });
  if (isEmpty(user)) {
    throw new NotFoundError('could not find user with the provided username (IDP)');
  }
  body.attributes = { ...user[0].attributes, ...body.attributes };

  await kcAdmin.users.update({ id: user[0].id! }, body);

  const [updatedUser] = await kcAdmin.users.find({
    username,
  });
  return updatedUser;
};
