import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getAuthManager } from '$service/auth/getAuthManager';

export interface RefreshTokenResponse {
  accessToken: string;
}

const refreshToken: ApiHandler<any, RefreshTokenResponse> = async (req, res) => {
  const authManager = await getAuthManager();
  return authManager.refreshToken(req, res);
};

export default withMiddleware(refreshToken)({
  operationId: 'refreshToken',
  description: 'Refresh Access Token',
  method: 'GET',
  isPublic: true,
});
