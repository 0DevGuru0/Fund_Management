import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import {
  ActivityInstance,
  activityInstanceDto,
} from '$service/activityInstances/activityInstanceDto';
import { queryActivityInstances } from '$service/activityInstances/queryActivityInstances';

interface Query {
  processInstanceId: string;
  [key: string]: string | string[];
}

const activityTimeline: ApiHandler<any, ActivityInstance[], Query> = async (req, res) => {
  const { processInstanceId } = req.query;

  return queryActivityInstances(processInstanceId, req);
};

export default withMiddleware(activityTimeline)({
  operationId: 'getActivityInstances',
  description: 'Get Activity Timeline of the Process Instance (sorted by startTime)',
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      processInstanceId: {
        type: 'string',
        openApiIn: 'path',
        format: 'uuid',
      },
    },
  },
  response: {
    type: 'array',
    items: activityInstanceDto,
  },
});
