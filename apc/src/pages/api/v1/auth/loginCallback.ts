import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getAuthManager } from '$service/auth/getAuthManager';

const callback: ApiHandler<any, any> = async (req, res) => {
  const authManager = await getAuthManager();
  await authManager.callbackHandler(req, res);
};

export default withMiddleware(callback)({
  operationId: 'oidcLoginCallback',
  description: 'OIDC Login Callback',
  method: 'GET',
  isPublic: true,
});
