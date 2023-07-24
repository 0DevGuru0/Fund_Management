import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { fetchAndUpdateJcr } from '$service/jcr/fetchAndUpdateJcr';

const setJcr: ApiHandler<any, any> = async (req, res) => {
  await fetchAndUpdateJcr(req.headers.authorization!);
  return 'setting JCR Done';
};

export default withMiddleware(setJcr)({
  operationId: 'crawlJcr',
  description: 'get jcr excel file and ',
  method: 'GET',
  response: {
    type: 'object',
  },
});
