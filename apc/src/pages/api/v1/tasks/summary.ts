import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { isAdmin } from '$service/auth/isAdmin';
import { UnauthorizedError } from '$service/errors';
import { getActiveTasksReport } from '$service/tasks/getActiveTasksReport';

interface Query {
  search: string;
  processDefinitionId: string;
  involvedUser: string;
  [key: string]: string | string[];
}

const getTasksSummary: ApiHandler<any, any, Query> = async (req, res, ctx) => {
  const { processDefinitionId, involvedUser } = req.query;

  const username = ctx.userToken.preferred_username;

  let involvedUsername: string | undefined;

  if (involvedUser) {
    if (isAdmin(ctx.userToken)) {
      involvedUsername = involvedUser;
    } else {
      throw new UnauthorizedError("You don't access to perform this action");
    }
  } else {
    involvedUsername = username;
  }

  const query = {
    processDefinitionId,
    username: involvedUsername === 'all' ? undefined : involvedUsername,
  };

  return getActiveTasksReport(query, req);
};

export default withMiddleware(getTasksSummary)({
  operationId: 'getTasksSummary',
  description: 'Get Summary Report of Tasks',
  method: 'GET',
  query: {
    type: 'object',
    properties: {
      involvedUser: {
        type: 'string',
        openApiIn: 'query',
        examples: [
          {
            value: 'all',
          },
          {
            value: 'Ali',
          },
        ],
      },
      search: {
        type: 'string',
        openApiIn: 'query',
        oneOf: [
          {
            description: 'by Title',
          },
          {
            description: 'by Key',
            format: 'uuid',
          },
        ],
      },
      processDefinitionId: {
        openApiIn: 'query',
        type: 'string',
        format: 'int32',
      },
    },
  },
  response: {
    type: 'array',
    items: {
      type: 'object',
    },
  },
});
