import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getAuthManager } from '$service/auth/getAuthManager';

const login: ApiHandler<any, any> = async (req, res) => {
  const authManager = await getAuthManager();
  await authManager.loginHandler(req, res);
};

export default withMiddleware(login)({
  operationId: 'login',
  description: 'Login',
  method: 'GET',
  isPublic: true,
});
