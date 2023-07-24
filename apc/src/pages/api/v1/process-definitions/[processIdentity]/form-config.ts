import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getStartFormConfigByIdentity } from '$service/wfEngine/getStartFormConfigByIdentity';

interface Query {
  processIdentity: string;
  [key: string]: string | string[];
}

const taskFormConfig: ApiHandler<any, Record<string, any>, Query> = async (req, res) => {
  const { processIdentity } = req.query;
  return getStartFormConfigByIdentity(processIdentity, req);
};

export default withMiddleware(taskFormConfig)({
  operationId: 'getStartFormConfig',
  description: 'Get start process form.io config',
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      processIdentity: {
        type: 'string',
        openApiIn: 'path',
        description: 'This can be process-definition ID or process-definition key',
      },
    },
    required: ['processIdentity'],
  },
});
