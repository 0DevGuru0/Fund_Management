import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';

interface Query {
  deep: string;
  [key: string]: string | string[];
}

interface Body {
  user?: {
    name: string;
    family: string;
    email: string;
  };
  action: string;
  level: number;
}

interface Response {
  userId: string;
}

const docsDemoPost: ApiHandler<Body, Response, Query> = async (req, res) => {
  return { userId: `12-3343-2v-23` };
};

export default withMiddleware(docsDemoPost)({
  operationId: 'createDemo',
  method: 'POST',
  tag: 'Docs Demo',
  description: 'Demo Post',
  query: {
    type: 'object',
    properties: {
      deep: {
        type: 'string',
        enum: ['true', 'false'],
        openApiIn: 'query',
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      user: {
        nullable: true,
        type: 'object',
        properties: {
          name: {
            type: 'string',
            faker: 'name.firstName', // to handle example response
          },
          family: {
            type: 'string',
            faker: 'name.lastName', // to handle example response
          },
          email: {
            type: 'string',
            format: 'email',
          },
        },
        required: ['email', 'name', 'family'],
      },
      action: {
        type: 'string',
        enum: ['elevate', 'downgrade'],
      },
      level: {
        type: 'integer',
        maximum: 20,
        minimum: 0,
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
