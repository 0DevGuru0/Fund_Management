import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import uploadDirectlyToS3 from '$service/file/uploadDirectlyToS3';

export interface Result {
  url: string;
  name: string;
  size: number;
}

const uploadFileApi: ApiHandler<any, Result> = (req, _res, ctx) =>
  // TODO: orgId should be the current user organizationId that client trigger api from it.
  uploadDirectlyToS3(req, 'orgId');

export const config = { api: { bodyParser: false } };

export default withMiddleware(uploadFileApi)({
  operationId: 'uploadFile',
  description: 'upload file to storage',
  method: 'POST',
  isPublic: true,
  response: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      size: {
        type: 'number',
      },
    },
  },
});
