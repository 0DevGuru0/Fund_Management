/* eslint-disable @typescript-eslint/naming-convention */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL?: string;
      WF_REQ_LOG_LEVEL?: string;
      PROJECT_ROOT_PATH?: string;
      NEXT_PUBLIC_API_SERVER_ADDRESS?: string;
      NEXT_PUBLIC_SERVER_ADDRESS?: string;
      NEXT_PUBLIC_APP_TITLE?: string;
      NEXT_PUBLIC_REPO_SERVER_ADDRESS?: string;
    }
  }
}
