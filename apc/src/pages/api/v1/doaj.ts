import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getDOAJData } from '$service/doaj/getDOAJData';

const doaj: ApiHandler<any, any> = async (req, res) => {
  return getDOAJData();
};

export default withMiddleware(doaj)({
  operationId: 'crawlDoaj',
  description: 'Call DOAJ API to get an updated list of open access journals',
  method: 'GET',
  response: {
    type: 'object',
  },
});
