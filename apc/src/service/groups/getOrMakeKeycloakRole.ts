import KcAdminClient from '@keycloak/keycloak-admin-client';
import RoleRepresentation from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation';

interface KeycloakRole {
  id?: string | null;
  name?: string | null;
}

export const getOrMakeKeycloakRole = async (
  clientId: string,
  role: KeycloakRole,
  kcAdminClient: KcAdminClient,
): Promise<RoleRepresentation> => {
  const roleName = role.id!;
  const kcRole = await kcAdminClient.clients.findRole({ id: clientId, roleName });
  if (kcRole) {
    return kcRole;
  }

  await kcAdminClient.clients.createRole({ id: clientId, name: roleName });
  const newKcRole = await kcAdminClient.clients.findRole({
    id: clientId,
    roleName,
  });

  return newKcRole;
};
