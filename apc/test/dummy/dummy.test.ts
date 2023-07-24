import { getBackendPrisma } from '$data/prisma';
import { getCamundaPlatformRESTAPI } from '$service/generated/wfCamunda';

import { createFakeJWT } from '../helpers/createFakeJWT';

import { PolicyType } from '.prisma/backend-client';

describe('Dummy tests (integration)', () => {
  it('should create a new policy', async () => {
    const prisma = await getBackendPrisma();
    await prisma.policy.create({
      data: {
        createdBy: 'Hossein',
        title: 'The Best Policy',
        terms: 'abc',
        type: PolicyType.VOUCHER,
        note: 'This is goood',
        fundId: 'not Good',
      },
    });

    const policy = await prisma.policy.findFirst();
    expect(policy!.title).toBe('The Best Policy');
  });

  // TODO: IW-340
  it('should connect to camunda', async () => {
    const jwtToken = createFakeJWT({
      exp: 1828079145,
      iat: 1828078845,
      sub: 'a94f756f-cff7-4742-bcb5-b7468733970b',
      email_verified: false,
      preferred_username: 'demo',
      given_name: 'Camunda',
      family_name: 'Demo',
      email: 'demo@camunda.org',
    });
    const { getRestAPIVersion } = getCamundaPlatformRESTAPI();

    const { version } = await getRestAPIVersion({
      headers: { authorization: `Bearer ${jwtToken}` },
    });
    expect(version).toBeString();
  });
});
