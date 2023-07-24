import { ApiAuthorizationChecker } from '$api/APIHandler';
import { getFundRoleOrganizations } from '$service/auth/getFundRoleOrganizations';
import { isAdmin } from '$service/auth/isAdmin';
import { ForbiddenError } from '$service/errors';

interface Body {
  fundId: string;
}

export const checkAuthForUsingFundId: ApiAuthorizationChecker<Body, any> = async (
  req,
  ctx,
): Promise<void> => {
  const { fundId } = req.body;
  if (isAdmin(ctx.userToken)) {
    return;
  }

  const tokenRolesFundOrganizations = getFundRoleOrganizations(ctx.userToken);
  if (!tokenRolesFundOrganizations.includes(fundId)) {
    throw new ForbiddenError();
  }
};
