import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { fetchAndUpdateSjr } from '$service/sjr/fetchAndUpdateSjr';

const setSjr: ApiHandler<any, any> = async (req, res) => {
  await fetchAndUpdateSjr(req.headers.authorization!);
  return 'setting SJR Done';
};

export default withMiddleware(setSjr)({
  operationId: 'crawlSjr',
  description: 'get sjr excel file and ',
  method: 'GET',
  response: {
    type: 'object',
  },
});
