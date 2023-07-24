import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';

interface Query {
  userId: string;
  [key: string]: string | string[];
}

interface Response {
  userId: string;
}

const docsDemoDelete: ApiHandler<Body, Response, Query> = async (req, res) => {
  return { userId: `12-3343-2v-23` };
};

export default withMiddleware(docsDemoDelete)({
  operationId: 'deleteDemo',
  method: 'DELETE',
  tag: 'Docs Demo',
  description: 'Demo Delete',
  query: {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        format: 'uuid',
        openApiIn: 'query',
      },
    },
  },
  response: {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        format: 'uuid',
      },
    },
    required: ['userId'],
  },
});
