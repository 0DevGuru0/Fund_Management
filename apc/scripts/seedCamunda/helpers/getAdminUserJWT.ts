import { createFakeJWT } from '../../../test/helpers/createFakeJWT';

const jwtToken = createFakeJWT({
  exp: 2028079145,
  iat: 2028078845,
  sub: 'a94f756f-cff7-4742-bcb5-b7468733970b',
  email_verified: false,
  preferred_username: 'demo',
  given_name: 'Camunda',
  family_name: 'Demo',
  email: 'demo@camunda.org',
});

export const getAdminUserJWT = (): string => jwtToken;
