import { ApiAuthorizationChecker } from '$api/APIHandler';
import { isAdmin } from '$service/auth/isAdmin';
import { isHimself } from '$service/auth/isHimself';
import { ForbiddenError } from '$service/errors';

interface Query {
  username: string;
  [key: string]: string | string[];
}

export const checkAuthForEditUser: ApiAuthorizationChecker<any, Query> = async (
  req,
  ctx,
): Promise<void> => {
  const { username } = req.query;
  if (isAdmin(ctx.userToken) || isHimself(ctx.userToken, username)) {
    return;
  }
  throw new ForbiddenError();
};
