import got from 'got';

import { getAdminUserJWT } from './getAdminUserJWT';

const request = got.extend({
  prefixUrl: process.env.WF_CAMUNDA_SERVER_ADDRESS ?? 'http://localhost:8080/engine-rest',
  headers: {
    authorization: `Bearer ${getAdminUserJWT()}`,
  },
});

export const seedClient = request;
