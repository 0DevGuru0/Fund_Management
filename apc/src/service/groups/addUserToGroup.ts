import RoleRepresentation from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation';
import { isEmpty } from 'lodash';
import { NextApiRequest } from 'next';
import getConfig from 'next/config';

import { GroupDto } from '$application/lib/generated/apcApi.schemas';
import { NotFoundError } from '$service/errors';
import { getCamundaPlatformRESTAPI } from '$service/generated/wfCamunda';

import { getKeycloakAdminClient } from './getKeycloakAdminClient';
import { getOrMakeCamundaGroup, GroupInput } from './getOrMakeCamundaGroup';
import { getOrMakeKeycloakRole } from './getOrMakeKeycloakRole';

const { createGroupMember, getQueryGroups } = getCamundaPlatformRESTAPI();
const { serverRuntimeConfig } = getConfig();

interface ReturnType {
  keycloakRole: RoleRepresentation;
  camundaGroup: GroupDto;
}

export const addUserToGroup = async (
  username: string,
  groupInput: GroupInput,
  req: NextApiRequest, // todo:handel req in upper level.
): Promise<ReturnType> => {
  // add user to Camunda group

  const group = await getOrMakeCamundaGroup(groupInput, req);

  const groupId = group.id!;

  const [oldGroupMembership] = await getQueryGroups(
    { name: group.name!, member: username },
    req,
  );
  if (!oldGroupMembership) {
    await createGroupMember(groupId, username, req);
  }

  const kcAdmin = await getKeycloakAdminClient();
  // get user from keycloak
  const user = await kcAdmin.users.find({
    username,
  });
  if (isEmpty(user)) {
    throw new NotFoundError('could not find user with the provided username (IDP)');
  }

  // add user to keycloak group
  const clientId = serverRuntimeConfig.OIDC_CLIENT_KEYCLOAK_UNIQUE_ID;
  const kcRole = await getOrMakeKeycloakRole(clientId, group, kcAdmin);

  const kcRoles = await kcAdmin.users.listClientRoleMappings({
    id: user[0].id!,
    clientUniqueId: clientId,
  });
  const hasRole = kcRoles.some(({ id }) => id === kcRole.id);

  if (!hasRole) {
    await kcAdmin.users.addClientRoleMappings({
      id: user[0].id!,
      clientUniqueId: clientId,
      roles: [
        {
          id: kcRole.id!,
          name: kcRole.name!,
        },
      ],
    });
  }

  return {
    keycloakRole: kcRole,
    camundaGroup: group,
  };
};
