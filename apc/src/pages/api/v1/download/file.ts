import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getDownloadFileURL, getFileKeyFromUrl } from '$service/file/getDownloadFileUrl';

export interface Result {
  url: string;
}

const bucket = process.env.FILE_STORAGE_BUCKET;
const getDownloadFileApi: ApiHandler<any, Result> = async (req, _res, ctx) => {
  const fileName = String(req.query.fileName);
  const fileUrl = String(req.query.fileUrl);
  const mimeType = String(req.query.mimeType);
  const fileKey = getFileKeyFromUrl(fileUrl);

  const result = await getDownloadFileURL(
    fileKey,
    String(fileName),
    String(mimeType),
    bucket,
  );
  return {
    url: result,
  };
};

export const config = { api: { bodyParser: false } };

export default withMiddleware(getDownloadFileApi)({
  operationId: 'getDownloadFile',
  description: 'get file download url from to storage',
  method: 'GET',
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      fileName: { type: 'string', openApiIn: 'query' },
      fileUrl: { type: 'string', openApiIn: 'query' },
      mimeType: { type: 'string', openApiIn: 'query' },
    },
    required: ['fileName', 'fileUrl', 'mimeType'],
  },
  response: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
      },
    },
  },
});
