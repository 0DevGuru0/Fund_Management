import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getCamundaPlatformRESTAPI } from '$service/generated/wfCamunda';

interface Query {
  taskId: string;
  userId: string;
  [key: string]: string | string[];
}

const { setAssignee } = getCamundaPlatformRESTAPI();
const setTaskAssigneeApi: ApiHandler<any, string, Query> = async (req, res, ctx) => {
  const { taskId, userId } = req.query;
  await setAssignee(taskId, { userId }, req);
  return `Task has been assigned to ${userId}`;
};

export default withMiddleware(setTaskAssigneeApi)({
  operationId: 'setTaskAssignee',
  description: 'Set assignee of a task',
  method: 'POST',
  query: {
    type: 'object',
    properties: {
      taskId: {
        type: 'string',
        openApiIn: 'path',
        format: 'uuid',
      },
      userId: {
        type: 'string',
        openApiIn: 'query',
      },
    },
    required: ['taskId'],
  },
  response: {
    type: 'string',
  },
});
