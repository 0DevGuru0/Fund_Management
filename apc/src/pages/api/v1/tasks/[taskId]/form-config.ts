import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getTaskFormConfigById } from '$service/wfEngine/getTaskFormConfigById';

interface Query {
  taskId: string;
  [key: string]: string | string[];
}

const taskFormConfig: ApiHandler<any, Record<string, any>, Query> = async (req, res) => {
  const { taskId } = req.query;
  return getTaskFormConfigById(taskId, req);
};

export default withMiddleware(taskFormConfig)({
  operationId: 'getTaskFormConfig',
  description: "Returns the task's form.io config",
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      taskId: {
        type: 'string',
        format: 'uuid',
        openApiIn: 'path',
      },
    },
  },
});
