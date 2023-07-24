import KcAdminClient from '@keycloak/keycloak-admin-client';
import getConfig from 'next/config';

import { sysLog } from '$service/logger';
// import axios from 'axios';

const { serverRuntimeConfig } = getConfig();

// Uncomment to log the KK requests
// axios.interceptors.request.use((config) => {
//   console.log(config.method, config.url, config.params, config.data);
//   return config;
// });

export const getKeycloakAdminClient = async (): Promise<KcAdminClient> => {
  const baseUrl = serverRuntimeConfig.OIDC_PROVIDER_ADDRESS?.replace(/\/$/, '');
  const keycloakAdmin = new KcAdminClient({
    baseUrl,
    realmName: 'master',
  });

  // Only the admin-cli client has direct access grant enabled
  await keycloakAdmin.auth({
    username: serverRuntimeConfig.KEYCLOAK_ADMIN_USERNAME,
    password: serverRuntimeConfig.KEYCLOAK_ADMIN_PASSWORD,
    grantType: 'password',
    clientId: 'admin-cli',
  });
  sysLog.info('[Keycloak Admin]: Successfully Authenticated as Keycloak Admin');

  // We want to make changes only in this application's realm
  keycloakAdmin.setConfig({
    realmName: serverRuntimeConfig.OIDC_REALM,
  });

  return keycloakAdmin;
};
