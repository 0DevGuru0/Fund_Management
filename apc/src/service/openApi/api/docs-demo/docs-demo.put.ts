import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';

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

const docsDemoPut: ApiHandler<Body, Response> = async (req, res) => {
  return { userId: `12-3343-2v-23` };
};

export default withMiddleware(docsDemoPut)({
  operationId: 'updateDemo',
  method: 'PUT',
  tag: 'Docs Demo',
  description: 'Demo Put',
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
            faker: 'internet.email', // to handle example response
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
