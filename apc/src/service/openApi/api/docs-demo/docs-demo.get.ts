import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';

interface Query {
  userId: string;
  [key: string]: string | string[];
}

interface Response {
  user: {
    name: string;
    family: string;
    email: string;
  };
}

const docsDemoGet: ApiHandler<any, Response, Query> = async (req, res) => {
  return {
    user: {
      name: 'Hossein',
      family: 'Saniei',
      email: 'h.saniei@gmail.com',
    },
  };
};

export default withMiddleware(docsDemoGet)({
  operationId: 'getDemo',
  method: 'GET',
  tag: 'Docs Demo',
  description: 'Demo Get',
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
      user: {
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
    },
    required: ['user'],
  },
});
