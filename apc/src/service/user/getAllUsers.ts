import { compact } from 'lodash';

import { getKeycloakAdminClient } from '$service/groups/getKeycloakAdminClient';
import { getTokenRolesSplitted } from '$service/groups/getTokenRolesSplitted';

import { UserDto } from './usersDto';

const clientUniqueId = process.env.OIDC_CLIENT_KEYCLOAK_UNIQUE_ID!;

export const getAllUsers = async (usernames: string[]): Promise<UserDto[]> => {
  const kcAdmin = await getKeycloakAdminClient();

  const usersPromise = await Promise.allSettled(
    usernames.map((user) => kcAdmin.users.find({ search: user })),
  );
  const users = compact(
    usersPromise.flatMap((promise) => {
      if (promise.status === 'fulfilled') {
        return promise.value;
      }
    }),
  );

  const userIds = users.map((user) => user.id!);
  const usersRoles = await Promise.all(
    userIds.map((userId) =>
      kcAdmin.users.listClientRoleMappings({
        id: userId!,
        clientUniqueId,
      }),
    ),
  );

  const result: UserDto[] = [];
  users.forEach((user, index) => {
    const roles = usersRoles[index].map((userRoles) => userRoles.name!);
    result.push({
      ...user,
      roles: getTokenRolesSplitted({ roles }),
    });
  });

  return result;
};
