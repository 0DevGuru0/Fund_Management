import { AuthenticationManager } from './AuthenticationManager';

import { InternalServerError } from '$errors';
import { sysLog } from '$logger';

let authManager: AuthenticationManager;

export const getAuthManager = async (): Promise<AuthenticationManager> => {
  if (!authManager) {
    try {
      const manager = new AuthenticationManager();
      await manager.init();
      authManager = manager;
    } catch (e) {
      sysLog.error(`AuthManager: ${e}`);
      throw new InternalServerError('Error when initializing authentication system');
    }
  }
  return authManager;
};
