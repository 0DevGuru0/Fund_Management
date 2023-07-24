import { v1 as uuidv1 } from 'uuid';

import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import {
  getFileUploadSignedUrl,
  UploadSignedUrl,
} from '$service/file/getFileUploadSignedUrl';

interface Query {
  fileName: string;
  mimeType: string;
  [key: string]: string | string[];
}
const getUploadUrlApi: ApiHandler<any, UploadSignedUrl, Query> = (req, res, ctx) => {
  const fileHashName = `${req.query.fileName}-${uuidv1()}`;
  return getFileUploadSignedUrl('public', fileHashName, req.query.mimeType);
};

export default withMiddleware(getUploadUrlApi)({
  operationId: 'getUploadUrl',
  description: 'get presigned url for uploading a file',
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      fileName: { type: 'string', openApiIn: 'query' },
      mimeType: { type: 'string', openApiIn: 'query' },
    },
    required: ['fileName', 'mimeType'],
  },
  response: {
    type: 'object',
    properties: {
      url: { type: 'string' },
      fields: { type: 'object' },
      fileKey: { type: 'string' },
    },
  },
});
