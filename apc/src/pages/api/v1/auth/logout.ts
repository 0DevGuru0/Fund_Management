import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getAuthManager } from '$service/auth/getAuthManager';

const logout: ApiHandler<undefined, undefined> = async (req, res) => {
  const authManager = await getAuthManager();
  await authManager.logoutHandler(req, res);
};

export default withMiddleware(logout)({
  operationId: 'logout',
  description: 'Logout',
  isPublic: true,
  method: 'GET',
});
