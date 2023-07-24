import { ApiAuthorizationChecker } from '$api/APIHandler';
import { getFundRoleOrganizations } from '$service/auth/getFundRoleOrganizations';
import { isAdmin } from '$service/auth/isAdmin';
import { ForbiddenError, NotFoundError } from '$service/errors';

import { getPolicies } from './getPolicies';

interface Query {
  policyId: string;
  [key: string]: string | string[];
}

export const checkAuthForPolicyChange: ApiAuthorizationChecker<any, Query> = async (
  req,
  ctx,
): Promise<void> => {
  const { policyId } = req.query;
  if (isAdmin(ctx.userToken)) {
    return;
  }

  const tokenRolesFundOrganizations = getFundRoleOrganizations(ctx.userToken);
  if (tokenRolesFundOrganizations.length === 0) {
    throw new ForbiddenError();
  }
  const result = await getPolicies({
    limit: 1,
    skip: 0,
    id: policyId,
  });
  const policy = result.policies[0];
  if (!policy) {
    throw new NotFoundError();
  }
  if (!tokenRolesFundOrganizations.includes(policy.fundId)) {
    throw new ForbiddenError();
  }
};
